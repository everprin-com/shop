import React from "react";
import Stars from "../Stars";

const ProductCommentBlock = ({ data, data: { author, date, text } }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <div className="author-stars-block">
          <b>{author}</b>
          <Stars miniRate />
        </div>
        <span className="comment__date">{date}</span>
      </div>
      <div className="comment__text">{text}</div>
    </div>
  );
};

export default ProductCommentBlock;
