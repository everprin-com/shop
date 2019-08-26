import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Chat from "@material-ui/icons/Chat";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";

const useStyles = makeStyles(theme => styles);

export default function HelpWidget({
  sendQuestion,
  setWidgetStatus,
  widgetStatus
}) {
  const classes = useStyles();

  const [data, setData] = useState({});

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value });
  };

  const handleClick = () => {
    if (widgetStatus == "SendMessage") {
      setWidgetStatus(null);
    } else {
      setWidgetStatus("SendMessage");
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
            <div className={classes.title}>Вопрос менеджеру</div>
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
            <TextField
              label="Сообщение"
              className={classes.textField}
              type="text"
              value={data["message"]}
              onChange={handleChange("message")}
              fullWidth
            />
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => sendQuestion(data)}
              color="primary"
            >
              Отправить
            </Button>
          </Paper>
        </form>
      </div>
    );
  };

  return (
    <div className={classes.sendMessage}>
      {widgetStatus == "SendMessage" && form()}
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleClick}
        // className={classes.fab}
      >
        <Chat />
      </Fab>
    </div>
  );
}
