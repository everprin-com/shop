import React from "react";
import Button from "@material-ui/core/Button";
import fetchPost from "../api/fetchPost";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    closeExitWindow: () => dispatch({ type: "CLOSE_EXIT_WINDOW" })
  };
};

const EXIT_REASONS = [
  "Ассортимент не большой",
  "Цена не устраивает",
  "Не сильно доверяю",
  "Не ясно какой размер брать",
  "Не понятно как сделать заказ",
  "Ошибки на сайте",
  "Я не ухожу",
  "Другое"
];

class ExitPopup extends React.PureComponent {
  getParams = () => {
    const pathname = location.pathname.replace("/", "");

    const category = pathname.length
      ? pathname.includes("categoryPage")
        ? pathname.split("/")[1]
        : "unknown"
      : "main page";
    const slug_id = pathname.length
      ? pathname.includes("productcart")
        ? pathname.split("/")[1]
        : "category page"
      : "main page";
    return { category, slug_id };
  };

  sendAnswer = reason => {
    const data = {
      questionnaires: {
        reason,
        ...this.getParams()
      }
    };
    fetchPost("/questionnaires", data);

    this.props.closeExitWindow();
  };

  render() {
    return (
      <div>
        <div className="exit-subtitle">Выберите пожалуйста причину ухода</div>
        <div className="exit-reasons-btns">
          {EXIT_REASONS.map(reason => {
            return (
              <Button
                key={reason}
                onClick={() => this.sendAnswer(reason)}
                variant="contained"
              >
                {reason}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ExitPopup);
