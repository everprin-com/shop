const styles = theme => ({
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    },
    icon: {
      fontSize: 35
    },
    smallMenu: {
      position: "absolute",
      bottom: "-56px",
      left: 0,
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block"
      }
    },
    button: {
      minWidth: 50,
      background: "#eee"
    },
    sideBarWrap: {
      width: 265
    }
  });

export default styles