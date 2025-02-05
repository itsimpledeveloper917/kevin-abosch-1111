import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../../assets/images";
import Details from "./details";
import BottomBar from "./bottom";
import LoadingKoi from "../../components/LoadingKoi";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import { DataContext } from "contexts/DataContextContainer";
import {
  ImageWrapper,
  MenuContainer,
  ImageMenu,
  DetailLink,
  MainImage,
  BidNow,
  LeftImg,
  RightImg,
  PlaceHolder,
  EvolveButton
} from "./style";
import { useHistory, useParams, useLocation, matchPath } from "react-router";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Kcommon from "@_koi/sdk/common";
import { useRef } from "react";

const PlaceHoler = () => {};

const Gallery = () => {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const [items, setItems] = useState([]);
  const [scrollLimit, setScrollLimit] = useState(50);
  const indexId = parseInt(id) - 1;
  const { contents, kevinNft, setModaOpen } = useContext(DataContext);
  const [nftInfo, setNftInfo] = useState("");
  const [owners, setOwners] = useState([]);
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const ref = useRef(null);
  const matchMain = matchPath(pathname, { path: "/gallery/:id/", exact: true });
  const matchDetail = matchPath(pathname, "/gallery/:id/details");
  const matchCollect = matchPath(pathname, "/gallery/:id/collect");

  const getKoi = async (txId) => {
    
    const Ktools = new Kcommon.Common();
    try {
      let nftRewards = await Ktools.getNftReward(txId);
      let nftContract = await Ktools.readNftState(txId);
      setNftInfo(nftRewards);
      setOwners(Object.entries(nftContract.balances));
    } catch (err) {
      console.log(err);
      throw err.message;
    }
  };

  useEffect(() => {
    setItems(contents);
    if (contents.length) {
      getKoi(contents[indexId].txId).catch((err) => {
        console.log(err);
      });
    }
  }, [contents]);

  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image.source;
      loadImg.key = image.name;
      loadImg.onload = () => {
        resolve(image.source);
      };

      loadImg.onerror = (err) => reject(err);
    });
  };

  const up = () => {
    loadImage(items[indexId + 3])
      .then(() => console.log("loaded"))
      .catch((err) => console.log("Failed to load images", err));
    setScrollLimit(50);

    history.push(`/gallery/${indexId + 2}`);
  };
  const down = () => {
    loadImage(items[indexId - 1])
      .then(() => console.log("loaded"))
      .catch((err) => console.log("Failed to load images", err));

    setScrollLimit(50);
    history.push(`/gallery/${indexId}`);
  };
  const handleScroll = (e) => {
    let newScrollLimit = scrollLimit - e.deltaY * 0.075;

    if (matchMain && !mobile) {
      if (newScrollLimit < 0) {
        up();
      } else if (newScrollLimit > 100) {
        down();
      } else {
        setScrollLimit(newScrollLimit);
      }
    }
  };

  const onShowDetails = () => {
    if (matchDetail) {
      history.replace(`/gallery/${id}/`);
    } else {
      history.push(`/gallery/${id}/details`);
    }
  };
  const handleLoaded = () => {
    console.log("LOADED");
  };
  return (
    <MetaWrapper>
      <MenuContainer ref={ref} onWheel={handleScroll} lockScroll={false}>
        {items[id] && (
          <>
            <ImageWrapper key={items[indexId].name}>
              <MainImage>
                <LazyLoadImage
                  key={items[indexId].name}
                  width="580"
                  height="580"
                  alt={items[indexId].name}
                  src={items[indexId].source}
                  onClick={onShowDetails}
                  effect="opacity"
                />
              </MainImage>

              <ImageMenu>
                <span>#{items[indexId].name}</span>
                {/* <span>
                  {nftInfo}
                  <img src={Logo} alt="koi-logo" />
                </span>
                {matchMain ? <span>Bid Now</span> : <span>ETH: 2.751</span>} */}
                {kevinNft && <EvolveButton onClick={()=>{setModaOpen(true)}}>EVOLVE</EvolveButton>}
              </ImageMenu>

              {!matchMain && (
                <>
                  <ImageMenu>
                    <DetailLink
                      value="details"
                      active={matchDetail}
                      to={`/gallery/${id}/details`}
                    >
                      Details
                    </DetailLink>
                    <DetailLink
                      value="collect"
                      active={matchCollect}
                      to={`/gallery/${id}/collect`}
                    >
                      Collect
                    </DetailLink>
                    {kevinNft?
                    <EvolveButton onClick={()=>{setModaOpen(true)}}>EVOLVE</EvolveButton>
                    :  <BidNow
                      href={`https://space.verto.exchange/asset/${items[indexId].txId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bid Now
                    </BidNow>}
                   
                  </ImageMenu>
                  <Details
                    item={items[indexId]}
                    id={id}
                    txId={items[indexId].txId}
                    owners={owners}
                  />
                </>
              )}
            </ImageWrapper>
            {mobile && (
              <BottomBar
                left={items[indexId - 1]}
                right={items[indexId + 1]}
                index={indexId}
              />
            )}
            {!mobile && (
              <>
                <LeftImg>
                  {indexId === 0 ? (
                    <PlaceHolder />
                  ) : (
                    <LazyLoadImage
                      key={items[indexId - 1].name}
                      onClick={down}
                      width="170"
                      height="170"
                      alt={items[indexId - 1].name}
                      src={items[indexId - 1].source}
                      effect="blur"
                    />
                  )}
                </LeftImg>

                <RightImg>
                  <LazyLoadImage
                    key={items[indexId + 1].name}
                    onClick={up}
                    width="170"
                    height="170"
                    alt={items[indexId + 1].name}
                    src={items[indexId + 1].source}
                    effect="blur"
                  />
                </RightImg>
              </>
            )}
          </>
        )}
      </MenuContainer>
    </MetaWrapper>
  );
};

export default Gallery;
