import React from "react";
import ProductWhriteReview from "../ProductWhriteReview";
import ProductCommentBlock from "../ProductCommentBlock";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import "./st";

const mapStateToProps = state => {
  return {
    comments: state.comment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openWriteReview: () => dispatch({ type: "SHOW_WRITEREVIEW_WINDOW" })
  };
};

const ProductReviews = ({ reviewsPorps = [], openWriteReview, comments }) => {
  if (!reviewsPorps) return null;
  return (
    <div className="comments">
      <Button
        variant="contained"
        color="primary"
        className="button"
        onClick={openWriteReview}
      >
        Оставить отзыв
      </Button>

      {[...comments.data, ...reviewsPorps].map(data => (
        <ProductCommentBlock data={data} key={data.text} />
      ))}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductReviews);
