import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import queryString from "query-string";
import {
  ModalWrapper,
  Modal,
  ArLink,
  Exit,
  BackArrow,
  ActionButton,
} from "./style";

import { DataContext } from "contexts/DataContextContainer";

import axios from "../../service/customAxios";
import Web3 from "web3";
import * as Kcommon from "@_koi/sdk/common";
import ConnectOpensea from "./connect";
import ShowOpensea from "./showOpensea";
import { IconClose } from "assets/images";
import { show_notification } from "service/utils";
import LoadingArea from "./loading";
import ErrorNFT from "./errorNFT";
import NoFinnie from "./noFinnie";
import ShowArt from "./showArt";
import AtomicNFT from "./atomicNFT";

const EvolveModal = ({
  hide = () => {},
  initStep = 0,
}) => {
  console.log({initStep})
  const history = useHistory();
  const { address } = queryString.parse(history.location.search);
  const [modalStep, setModalStep] = useState(initStep) // connect_opensea || show_nft || loading || no_nft || no_finnie || show_art || atomic_nft
  const [errorNFT, setErrorNFT] = useState('')
  const [koiiAddress, setKoiiAddress] = useState('')
  
  const { addressEth, addressAr, kevinNft, setKevinNft } = useContext(DataContext);

  function redeem(payload) {
    console.log("payload......", payload);
    axios
      .post("http://localhost:8887/registerKevinNFT", payload)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
        //Register with Koi
      })
      .catch((error) => {
        //   console.error(error)
      });
  }

  const sign = (address) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if (addressAr) {
      var payload = {
        ownerArAddress: addressAr,
      };
    } else {
      
    }

    window.ethereum.enable().then(async (accounts) =>
      web3.eth.personal.sign(address, accounts[0]).then((res) => {
        payload.signature = res;
        console.log('signature', res);
        console.log('signature', payload);
        redeem(payload);

      })
    );
  };

  const onEvolve = () => {
    // const params = {
    //   from: addressAr,
    //   to: "0xd0000000000",
    //   data: iskevinNft,
    // };

    // window.ethereum
    //   .request({
    //     method: "eth_sendTransaction",
    //     params,
    //   })
    //   .then((result) => {
    //     //verify burn and send to server for verification.

    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     throw (error)
    //   });
    sign(address)
  };

  const onExit = () => {
    setErrorNFT('')
    hide()
  };
  const checkKevinNFT = (nfts = []) => {
    let kevinNFTs = [];
    for (var i = 0; i < nfts.length; i++) {
      if ( nfts[i].asset_contract.address === "0x7f72528229f85c99d8843c0317ef91f4a2793edf" ) {
        console.log(nfts[i].asset_contract.address);
        kevinNFTs.push(nfts[i]);
      }
    }
    if(kevinNFTs.length > 0){
      setKevinNft(kevinNFTs);
      setModalStep('show_nft')
    }else{
      // show error loading
      setModalStep('no_nft')
    }
  };
  const getNFTwallet = () => {
    // const tempEth = '0xe35a42153fecf7710733252fd8ef16b92fac4b95'
    const tempEth = addressEth
    setModalStep('loading')
    fetch(
      //  `https://api.opensea.io/api/v1/assets?owner=0x8dea9139b0e84d5cc2933072f5ba43c2b043f6db&order_direction=desc&offset=0&limit=20`,
      //  `https://api.opensea.io/api/v1/assets?owner=0x9428E55418755b2F902D3B1f898A871AB5634182&order_direction=desc&offset=0&limit=100`,
      // `https://api.opensea.io/api/v1/assets?owner=${addressEth}&order_direction=desc&offset=0&limit=50`,
      `https://api.opensea.io/api/v1/assets?owner=${tempEth}&order_direction=desc&offset=0&limit=50`,
      { method: "GET" }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log({ data });
        if (data.assets.length === 0) {
          show_notification(
            `Our school of Koii couldn't find anything on OpenSea NFTs associated with that wallet[${addressEth}].`
          );
        }

        let temp_opensea = data.assets;
        checkKevinNFT(temp_opensea);
        
      })
      .catch((err) => {
        console.log(err);
        setErrorNFT(`Our school of Koii couldn't find anything on OpenSea NFTs associated with that wallet[${addressEth}].`)
      })
      .finally(() => {
        // go to next step
        // setModalStep('show_nft')
      });
  }
  const checkFinnie = async () => {
    try {
      // Does it exist?
      let extensionObj = await window.koiWallet;
      if(extensionObj === undefined) {
        // eslint-disable-next-line no-throw-literal
        console.log("error undefined finnie")
        return false  
      }
      console.log({extensionObj})
      return true
      // Is it connected?
      // let res = await extensionObj.getPermissions();
      // console.log("Extension1", res);
      // if (res.status === 200 && res.data.length) return true;
      // else return false;
    } catch (error) {
      // Have to throw error to trigger rejected
      // eslint-disable-next-line no-throw-literal
      // throw "Extension does not exist";
      console.log("error chk finnie", error)
      return false
    }
  }
  const connectFinnie = async () => {
    const extension = window.koiWallet;
    try {
      let res = await extension.connect();
      console.log("Extension", res);
      if (res.status === 200) {
        let koii_address = await extension.getAddress();
        // console.log({koii_address})
        setKoiiAddress(koii_address.data)
        return true;
      }

      return false
    } catch (error) {
      console.log('finnie connect error', error)
      return false
    }
  }
  const getEvolveArt = async () => {
    try {
      if(await checkFinnie()){
        // installed finnie and connect finnie
        if(await connectFinnie()) {
          // go to show art page
          console.log('go to show art page')
          setModalStep('show_art')
        }else{
          // error connect finnie
          console.log('error connect finnie')
          setModalStep('no_finnie')
        }
      }else{
        // show connect finnie page
        console.log('show connect finnie page')
        setModalStep('no_finnie')
      }
    } catch (error) {
      console.log('error connect finnie', error)
      setModalStep('no_finnie')
    }
  }
  const getModalSize = () => {
    if(modalStep === 'loading' || modalStep === 'show_nft' || modalStep === 'no_finnie' || 
      modalStep === 'show_art' || modalStep === 'atomic_nft') 
      return true
    else 
      return false
  }
  return (
    <ModalWrapper>
      <Modal className={`${getModalSize() ? 'small' : ''}`}>
        <Exit onClick={onExit}>
          <img src={IconClose} alt="modal close" />
        </Exit>
        {modalStep === 'loading' && <LoadingArea error={errorNFT} back={onExit}/> }
        {modalStep === 'no_nft' && <ErrorNFT /> }
        {modalStep === 'connect_opensea' && <ConnectOpensea getNFTwallet={getNFTwallet} /> }
        {modalStep === 'show_nft' && <ShowOpensea kevinNft={kevinNft} action={getEvolveArt} /> }
        {modalStep === 'no_finnie' && <NoFinnie /> }
        {modalStep === 'show_art' && <ShowArt koiiAddress={koiiAddress} kevinNft={kevinNft} action={getEvolveArt} /> }
        {modalStep === 'atomic_nft' && <AtomicNFT kevinNft={kevinNft} back={onExit} /> }
      </Modal>
    </ModalWrapper>
  );
};

export default EvolveModal;
