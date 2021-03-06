import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Phone from "@material-ui/icons/Phone";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";

const useStyles = makeStyles(theme => styles);

export default function HelpWidget({
  sendQuestion,
  widgetStatus,
  setWidgetStatus
}) {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [sended, setSend] = useState(false);

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value });
  };

  const handleClick = () => {
    if (widgetStatus == "CallBack") {
      setWidgetStatus(null);
      setSend(false);
    } else {
      setWidgetStatus("CallBack");
    }
  };
  const form = () => {
    return (
      <div className={classes.widgetWrap}>
        <form noValidate autoComplete="off" className={classes.askForm}>
          <Paper className={classes.paper}>
            <Fab className={classes.closeWidget} onClick={handleClick}>
              X
            </Fab>
            <div className={classes.widgetContent}>
              {sended && (
                <div>
                  <div>
                    <p>Спасибо за обращение.</p>
                    <p>Наш менеджер скоро с Вами свяжется </p>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className={classes.button}
                      onClick={() => {
                        setSend(false);
                        setWidgetStatus(null);
                      }}
                      color="primary"
                    >
                      Вернуться на сайт
                    </Button>
                  </div>
                </div>
              )}
              {!sended && (
                <div className={classes.widgetContentInner}>
                  <div className={classes.title}>Перезвонить мне</div>
                  <TextField
                    label="Имя"
                    className={classes.textField}
                    type="text"
                    value={data["name"]}
                    onChange={handleChange("name")}
                    fullWidth
                  />
                  <TextField
                    label="Телефон"
                    value={data["telephone"]}
                    onChange={handleChange("telephone")}
                    className={classes.textField}
                    type="text"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                      sendQuestion({ message: "CALLBACK", ...data });
                      setSend(true);
                    }}
                    color="primary"
                  >
                    Отправить
                  </Button>
                </div>
              )}
            </div>
          </Paper>
        </form>
      </div>
    );
  };

  return (
    <div className={classes.callBack}>
      {widgetStatus == "CallBack" && form()}
      <Fab
        size="small"
        aria-label="add"
        onClick={handleClick}
        className={classes.fab}
      >
        <Phone />
      </Fab>
    </div>
  );
}
