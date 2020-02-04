import React from "react";
import Star from "@material-ui/icons/Star";
import "./style";

class Stars extends React.PureComponent {
  handleClick = e => {
    const { setRate } = this.props;
    if (!setRate) return;
    setRate(e);
  };

  toReviewTab = () => {
    const { handleTabChange } = this.props;
    if (handleTabChange) handleTabChange(null, 1);
  };

  render() {
    const {
      rate,
      mini,
      amount,
      className,
      commentsArr = [],
      withLabel,
      withNumberLabel
    } = this.props;
    const formatNumberTo = (val, number) => (!!val ? val : number);
    const getReviewStr = amount => {
      switch (amount) {
        case 1:
          return "1 отзыв";
        case 2:
        case 3:
        case 4:
          return `${amount} отзыва`;
        default:
          return `${amount} отзывов`;
      }
    };
    const commonSumma =
      formatNumberTo(rate, 0) * formatNumberTo(amount, 1) +
      (commentsArr.length > 0
        ? commentsArr.reduce((prev, next) => {
            return prev + (next.voted ? next.voted.mark : 0);
          }, 0)
        : 0);
    let commonAmount;
    let commonRate;
    let label;
    if (withLabel) {
      commonAmount = commentsArr.length + formatNumberTo(amount, 0);
      commonRate =
        commonAmount == 0 && !rate ? 0 : Math.round(commonSumma / commonAmount);
      label = commonAmount ? getReviewStr(commonAmount) : false;
    } else if (withNumberLabel) {
      commonAmount = commentsArr.length + formatNumberTo(amount, 0);
      label = `${commonAmount}`;
      commonRate = rate;
    } else {
      commonAmount = 1;
      commonRate = rate;
    }

    const renderLabel = !!(label && (withLabel || withNumberLabel));
    return (
      <div
        className={`${mini ? "miniRate" : "rate"} ${
          className ? className : ""
        } ${!commonRate ? "unactive" : ""}`}
        onClick={this.toReviewTab}
      >
        <Star
          className={`star ${commonRate == 1 ? "active" : ""}`}
          onClick={() => this.handleClick(1)}
        />
        <Star
          className={`star ${commonRate == 2 ? "active" : ""}`}
          onClick={() => this.handleClick(2)}
        />
        <Star
          className={`star ${commonRate == 3 ? "active" : ""}`}
          onClick={() => this.handleClick(3)}
        />
        <Star
          className={`star ${commonRate == 4 ? "active" : ""}`}
          onClick={() => this.handleClick(4)}
        />
        <Star
          className={`star ${commonRate == 5 ? "active" : ""}`}
          onClick={() => this.handleClick(5)}
        />{" "}
        {renderLabel && (
          <span className={withNumberLabel ? "rate-number-label" : ""}>
            {label}
          </span>
        )}
      </div>
    );
  }
}

export default Stars;
