import React from "react";
import Stars from "../Stars";

class ProductCommentBlock extends React.PureComponent {
  render() {
    const { data: { author, date, text, voted } } = this.props

    return (
      <div className="comment">
        <div className="comment-header">
          <div className="author-stars-block">
            <b>{author}</b>
            <Stars rate={voted && voted.mark} mini />
          </div>
          <span className="comment__date">{date}</span>
        </div>
        <div className="comment__text">{text}</div>
      </div>
    );
  }
};

export default ProductCommentBlock;
