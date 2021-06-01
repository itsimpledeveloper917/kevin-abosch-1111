import { LazyLoadImage } from "react-lazy-load-image-component";
import { BottomBar, LeftImg, RightImg, PlaceHolder, LeftArrow, RightArrow } from "./style";
import React from "react";
import Arrow from "../../components/Arrows"
const Bottom = ({ left, right, index }) => {
  const mobile = window.matchMedia("(max-width: 768px)").matches
  return (
    <BottomBar>
      {mobile ? <a>
        <Arrow/> </a>: <LeftImg>
        {index === 0 ? (
          <PlaceHolder />
        ) : (
          <LazyLoadImage
            width="170"
            height="170"
            alt={left.name}
            src={left.source}
            effect="blur"
          />
        )}
      </LeftImg> }

     {mobile ? <a>
       <Arrow direction="right" /> </a>: <RightImg>
        <LazyLoadImage
          width="170"
          height="170"
          alt={right.name}
          src={right.source}
          effect="blur"
        />
      </RightImg>}
      
    </BottomBar>
  );
};

export default Bottom;