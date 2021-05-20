/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import { Button, Container, Image } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import { FaArrowLeft, FaCheck, FaPlus } from "react-icons/fa";
import { UploadOpenSeaContainer, KevinContainer } from "./style";
import { useHistory } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";
import { colors } from "theme";
import {alertTimeout} from 'config'
import AlertArea from "components/Sections/AlertArea";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import Web3 from "web3";
import axios from 'axios';

// const testOpenseaAddress = '0xd703accc62251189a67106f22d54cd470494de40'

function UploadOpenSea() {
  const history = useHistory();
  const { openSeas, setOpenSeas, addressAr } = useContext(DataContext);
  const { address } = queryString.parse(history.location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [iskevinNft, setIskevinNft] = useState(null);

  const onClickCard = (cardId) => {
    let tempSelectedCards = [...selectedIds];
    if (tempSelectedCards.includes(cardId)) {
      setSelectedIds(tempSelectedCards.filter((_cardId) => _cardId !== cardId));
    } else {
      setSelectedIds([...tempSelectedCards, cardId]);
    }
  };

  const onSelectAll = () => {
    setIsAllSelected(!isAllSelected);
  };


  const  sign  = () => {
    // setIsAllSelected(!isAllSelected);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if(addressAr){
      // var arAddress = "FeSD9TV8aB0GK0yby8A40KEX1N-3wrJQTDbRW4uUiEA"
      var payload = {
        ownerArAddress: addressAr,
      };
    }else{
      history.push("/wallet-key");
    }

    //var hash = web3.utils.sha3(message)
    //var accounts = await web3.eth.getAccounts()
    window.ethereum.enable().then( async (accounts)=> 
      web3.eth.personal.sign(addressAr, accounts[0]).then((res)=>{
        payload.signature = res;
        console.log('signature', res);
        console.log('signature', payload);
         redeem(payload);

        // Dong, here we need to submit the payload to server(koi.server), i will provide the api 

      })
    );
  };

   function redeem(payload) {
    // await ktools.loadWallet(walletKeyLocation);
     //let key 
    // const payload =  {ownerArAddress: "FeSD9TV8aB0GK0yby8A40KEX1N-13wrJQTDbRW4uUiEA", signature: "0x9ddcce4db3a2101cdc56a0b6785f399b193372ac88f62188890420094e158b803ba4de22960a576525661218c3137264d5f4640f4efbfbb855e2d21852cbe4e21c"};
     
    console.log('payload......', payload);
  
     axios
         .post('http://localhost:8886/voucher', payload)
         .then(res => {
             console.log(`statusCode: ${res.statusCode}`)
             console.log(res)
         })
         .catch(error => {
          //   console.error(error)
         })
  }

  const onClickVerify = () => {
    // history.push(`/confirm-opensea?address=${testOpenseaAddress}&step=1&selected=${selectedIds.join('_')}`)
    history.push(
      `/confirm-opensea?address=${address}&step=1&selected=${selectedIds.join(
        "_"
      )}`
    );
  };

  const showKevinNFTArea = () => {
    //image_original_url
    console.log(iskevinNft)
    return (
      <KevinContainer>
        {/* <h1 className="text-blue">Your NFTs are stored <span className="underline">forever</span></h1> */}
        <div className="orange-area">
          {/* <div className="cap1"><b>Congratulations!</b> Your 1111 NFT is now in your Metamask wallet.</div>
          <div className="cap1">You'll start earning KOI as soon as someone views your NFT.</div> */}
          <div className="kevin-area mt-4">
            <div className="img-area"><Image src={iskevinNft.image_url} /></div>
            <div className="info-area">
              <div className="cap2"> Look what we found!</div>
              <div className="cap3 mt-3 mb-3"><b>1111 #0504</b> by Kevin Abosch</div>
              <div className="cap3">Since you purchased a piece from Abosch’s 1111 collection, you can store it on Arweave and receive KOI rewards whenever someone views it.</div>
              <div className="cap3">Register your piece now, for free! </div>
              <Button className="btn-back btn-blueDark mt-3" onClick={sign}>register</Button>
            </div>
          </div>
        </div>
      </KevinContainer>)
  }

  useEffect(() => {
    if (isAllSelected) {
      setSelectedIds(openSeas.map((_card) => _card.id));
    } else {
      setSelectedIds([]);
    }
  }, [isAllSelected]);

  useEffect(() => {
    if (address) {
      setIsLoading(true);
      const options = {
        method: "GET",
        // params: {
        //   owner: "0x3a3d6f2b81187Bd4c365b6dAfB260b59f5783854",
        // },
      };

      fetch(
        // `https://api.opensea.io/api/v1/assets?owner=0xd703accc62251189a67106f22d54cd470494de40&order_direction=desc&offset=0&limit=20`,
        // `https://api.opensea.io/api/v1/assets?owner=0x8dea9139b0e84d5cc2933072f5ba43c2b043f6db&order_direction=desc&offset=0&limit=20`,
        `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`,
        options
      )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log({ data });
        if(data.assets.length === 0) {
          show_alert(`Our school of koi couldn't find anything on OpenSea NFTs associated with that wallet[${address}].`)
        }

        setOpenSeas(data.assets);
        checkKevinNFT(data.assets)
        console.log(data.assets);
      })
      .catch(err => {
        console.log(err)
        show_alert(`Our school of koi couldn't find anything on OpenSea NFTs associated with that wallet[${address}].`)
      })
      .finally(() =>{
        setIsLoading(false);
      });
    }
  }, [history.location.pathname]);


  const checkKevinNFT = (nfts = []) => {
    for(var i = 0; i < nfts.length; i++){
      if(nfts[i].asset_contract.address === "0x7f72528229f85c99d8843c0317ef91f4a2793edf") {
         // if(nfts[i].asset_contract.address === "0x495f947276749ce646f68ac8c248420045cb7b5e") {
        console.log(nfts[i].asset_contract.address)
        setIskevinNft(nfts[i])
        break;
      }
    }
  }

  const show_alert = (message = '') => {
    setShowAlert(true)
    setErrMessage(message)
    setTimeout( () => {
      setShowAlert(false)
      setErrMessage('')
    }, alertTimeout)
  }

  return (
    <MetaWrapper>
      <UploadOpenSeaContainer>
        <AlertArea
          showMessage={showAlert}
          message={errMessage}
        ></AlertArea>
        <Container>
          <div className="opensea-content-wrapper">
            <div className="opensea-content">
              <div className="title-wrapper">
                <h1 className="text-blue opensea-title">Your OpenSea content</h1>
                <Button className="back-wrapper btn-orange" onClick={() => history.replace('/')}>
                  <FaArrowLeft size={20} color={colors.blueDark} />
                  <h6 className="mb-0 text-blue text-bold ml-2">Leaderboard</h6>
                </Button>
              </div>
              {iskevinNft && showKevinNFTArea()}
              <h4 className="opensea-description">
                Select your NFTs to upload them to Arweave’s permaweb. You’ll earn
                rewards every time someone views them!
              </h4>
              <div className="counts-wrapper">
                <div
                  className={`selected-counts ${
                    selectedIds.length > 0 && "isSet"
                  }`}
                >
                  {selectedIds.length}
                </div>
                <Button
                  className={`btn-all ${isAllSelected && "selected-all"}`}
                  onClick={onSelectAll}
                >
                  Select all NFTs
                </Button>
              </div>
              {isLoading ? (
                <div className="loading-container">
                  <ScaleLoader size={15} color={"#2a58ad"} />
                </div>
              ) : (
                <Row
                  // gutter={{ xs: [8, 8], sm: [16, 16], md: [24, 24], lg: [32, 32] }}
                  gutter={[
                    { xs: 16, sm: 16, lg: 32 },
                    { xs: 40, sm: 40, lg: 32 },
                  ]}
                  className="opensea-cards"
                >
                  {openSeas.length > 0 &&
                    openSeas.map((_card, _i) => {
                      let selected = selectedIds.includes(_card.id);
                      return (
                        <Col
                          key={_i}
                          className="gutter-row"
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 12 }}
                          lg={{ span: 6 }}
                        >
                          <div
                            className={`opensea-card ${
                              selected ? "selected" : ""
                            }`}
                            onClick={() => onClickCard(_card.id)}
                          >
                            {selected ? (
                              <div className="icon-checked">
                                <FaCheck />
                              </div>
                            ) : (
                              <div className="icon-plus">
                                <FaPlus />
                              </div>
                            )}
                            <div className="card-img">
                              <Image src={_card.image_thumbnail_url} />
                            </div>
                            <div className="card-content">
                              <h6>{_card.name}</h6>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              )}
              <div className="btn-verify-wrapper">
                <Button
                  className="btn-back btn-blueDark"
                  disabled={selectedIds.length === 0}
                  onClick={onClickVerify}
                >
                  Verify Details
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </UploadOpenSeaContainer>
    </MetaWrapper>
  );
}

export default UploadOpenSea;
