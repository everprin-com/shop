import React from "react";
import "./style";

function SocialIcon({ instagram = false }) {
  return (
    <a
      href={
        instagram
          ? "https://www.instagram.com/kilo.com.ua/"
          : "https://www.facebook.com/kilo.com.ua/"
      }
      className={`social-icon-wrap ${instagram ? "instagram" : ""}`}
      target="_blank"
    />
  );
}

export default SocialIcon;
