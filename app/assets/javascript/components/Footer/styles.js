const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      marginTop: 15,
      display: 'flex',
      justifyContent: 'space-around',
      overflow: "hidden",
    },
    list: {
      listStyle: 'none',
    },
    link: {
      textDecoration: 'none',
    },
    contacts: {
      width:350,
      padding:20,
      margin: '0 20px',
    },
    item: {
      cursor:"pointer",
      "&:hover": {
        color: "#303f9f"
      },
    }
  })

export default styles