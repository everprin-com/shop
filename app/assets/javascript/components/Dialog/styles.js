const styles = theme => ({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content"
    },
    formControl: {
      // marginTop: theme.spacing.unit * 2,
      minWidth: 120
    },
    formControlLabel: {
      // marginTop: theme.spacing.unit
    },
    title: {
      textAlign: "center"
    },
    dialog: {
      [theme.breakpoints.down("xs")]: {
        margin: 0
      }
    },
    gallery: {
      padding: "8px 30px",
      overflow: "hidden"
    }
  });

export default styles