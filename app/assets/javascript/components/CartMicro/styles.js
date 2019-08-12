const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      padding: 5,
      maxWidth: 550,
      margin: "10 0"
    },
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around"
    },
    title: {
      margin: 0
    },
    totalBlock: {
      margin: 20,
      // flexDirection: 'column',
      display: "flex",
      alignItems: "flex-end",
      fontFamily:
        'Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans",sans-serif',
      fontSize: 24,
      justifyContent: "flex-end"
    },
    imageWrapper: {
      width: 130,
      height: 100,
      overflow: 'hidden',
    },
    image: {
      height: "100%"
    },
    totalPrice: {
      marginBottom: 5,
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
      }
    },
    contentText: {
      display: "flex",
      flexDirection: "column",
      minWidth: 200
    },
    paperRoot: {
      padding: 5
    },
    name: {
      padding: 0,
      textTransform: "lowercase",
      fontSize: 16
    },
    headerCell: {
      padding: 7
    },
    table: {
      overflowY: "auto",
      maxHeight: 500
    },
    cell: {
      padding: 10,
      [theme.breakpoints.down("xs")]: {
        padding: "7px 3px 7px 3px"
      }
    }
  });

export default styles