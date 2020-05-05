import React from "react";
import "./style";
import googleEvents from "../constants/googleEvents";

class SocialIcon extends React.PureComponent {
  handleClick() {
    gtag(
      "event",
      googleEvents["Переход в соцсети"].title,
      googleEvents["Переход в соцсети"].data
    );
  }
  render() {
    const { instagram = false } = this.props;
    return (
      <a
        href={
          instagram
            ? "https://www.instagram.com/kilo.com.ua/"
            : "https://www.facebook.com/kilo.com.ua/"
        }
        className={`social-icon-wrap ${instagram ? "instagram" : ""}`}
        onClick={this.handleClick}
        target="_blank"
      />
    );
  }
}

export default SocialIcon;
