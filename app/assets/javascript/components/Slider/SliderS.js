import React from "react";
import Slider from "./Slider";

function SliderItem({ src, classes }) {
  return (
    <div className={classes.gelleryItemWrap}>
      <img src={src} className={classes.gelleryItem} />
    </div>
  );
}

function SliderS({ picture, classes }) {
  return (
    <div className={`${classes.img} fluid__image-container gallery`}>
      <Slider
        slidesToShow={1}
        slidesToScroll={1}
        simple
        products={
          Array.isArray(picture)
            ? picture.map(src => SliderItem({ src, classes }))
            : picture
        }
        draggable
        arrows
        effect="fade"
        vertical
        customPaging={i => {
          return (
            <a>
              <img src={picture[i]} />
            </a>
          );
        }}
        dots
        dotsClass={"slick-dots slick-thumb"}
      />
    </div>
  );
}

export default SliderS