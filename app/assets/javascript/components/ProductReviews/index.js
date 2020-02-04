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

class ProductReviews extends React.PureComponent {
  render() {
    const { reviewsPorps = [], openWriteReview, comments, slugId } = this.props;
    if (!reviewsPorps) return null;
    const commentsArr = comments.data.filter(
      comment => comment.slug_id == slugId
    );

    const sortByDate = (prev, next) => {
      return (
        new Date(
          next.date
            .split(".")
            .reverse()
            .join(".")
        ).getTime() -
        new Date(
          prev.date
            .split(".")
            .reverse()
            .join(".")
        ).getTime()
      );
    };
    const sortedComments = comments => comments.sort(sortByDate);
    const resultComments = sortedComments([...commentsArr, ...reviewsPorps]);
    return (
      <div className="comments">
        {!resultComments.length && (
          <div className="no-comment-text">Вы можете стать первым, кто напишет отзыв</div>
        )}
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={openWriteReview}
        >
          Оставить отзыв
        </Button>

        {resultComments.map(data => (
          <ProductCommentBlock data={data} key={data.text} />
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductReviews);
