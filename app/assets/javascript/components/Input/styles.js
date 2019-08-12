import purple from "@material-ui/core/colors/purple";

const styles = theme => ({
    root: {
      display: 'inline-block',
      [theme.breakpoints.up('sm')]: {
        width: '190px',
      },
      [theme.breakpoints.up('md')]: {
        width: '350px',
      },
      [theme.breakpoints.up('lg')]: {
        width: '450px',
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: purple[500],
      },
    },
    cssOutlinedInput: {
      width: "100%",
      '&$cssFocused $notchedOutline': {
        borderColor: purple[500],
      },
    },
    notchedOutline: {},
  
    bootstrapInput: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 26,
      width: 350,
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    bootstrapFormLabel: {
      fontSize: 18,
    },
    img: {
      width: 50,
      height: 'avto'
    },
    item: {
      display: 'flex',
      alignItems: "center",
      margin: "3px 5px",
      cursor: "pointer",
    },
    inputWrap: {
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
    },
    dropDown: {
      position: 'absolute',
      width: 450,
      maxHeight: 500,
      overflowY: 'auto',
    },
    textContent: {
      marginLeft: 15,
    },
    linkItem: {
      textDecoration: 'none',
        overflow: "hidden",
        textShadow: "0px 30px 0px transparent",
        boxShadow: "0px 1px 3px 0px #cdcecf",
        transition: "all 300ms linear 0ms",
    },
    category: {
      fontSize: '15px',
      color: "#333",
      textDecoration: "none",
    },
    title: {
      color: "#333",
      textDecoration: "none",
    },
    paperItem: {
      marginBottom: 5,
      "&:hover": {
        background: "#eee"
      }
    }
  });

export default styles