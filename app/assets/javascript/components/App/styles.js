const styles = theme => ({
    root: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      [theme.breakpoints.up("xs")]: {
        width: "375px"
      },
      [theme.breakpoints.up("sm")]: {
        width: "600px"
      },
      [theme.breakpoints.up("md")]: {
        width: "1000px"
      },
      [theme.breakpoints.up("lg")]: {
        width: "1240px"
      },
      // [theme.breakpoints.between('lg')]: {
      //   width: '1240px',
      // },
      // width: '1240px',
      margin: "0 auto",
      positon: "relative"
    },
    appInner: {
      padding: "0 12px 12px 12px !important"
    }
  });

export default styles