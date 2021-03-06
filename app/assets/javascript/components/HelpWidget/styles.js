const styles =  {
  sendMessage: {
    position: "fixed",
    right: 20,
    bottom: 120,
    zIndex: 6,
    ['@media (max-width:600px)']: {
      right: 5,
    }
  },
  fab: {
    background: "#4fb748",
    color: "#fff",
    "&:hover": {
      background: "#4fa748"
    }
  },
  callBack: {
    position: "fixed",
    right: 20,
    bottom: 170,
    zIndex: 6,
    ['@media (max-width:600px)']: {
      right: 5,
    }
  },
  askForm: {
    bottom: 0,
    width: 350,
    right: "100px",
    position: "absolute",
    ['@media (max-width:600px)']: {
      width: 300,
      right: 50,
      bottom: 50,
    }
  },
  paper: {
    padding: 25,
    ['@media (max-width:600px)']: {
      padding: 10,
    }
  },
  button: {
    margin: "20px 0px 0 0"
  },
  widgetWrap: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    left: 0,
    top: 0,
    background: "rgba(0,0,0,.5)"
  },
  closeWidget: {
    position: "absolute",
    minHeight: "auto",
    height: 25,
    right: "-5px",
    top: "-5px",
    fontSize: 14,
    width: 25
  },
  messageTextarea: {
    padding: "10px",
    width: "100%",
    marginTop: "40px",
    height: "100px",
  }
};

export default styles;
