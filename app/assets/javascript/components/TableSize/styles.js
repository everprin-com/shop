import { bold } from "ansi-colors";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    minWidth: 50,
    background: "#eee"
  },
  tableRow: {
    "&:hover": {
      background: "#eee"
    }
  },
  tableHeadCell: {
    fontWeight: "bold"
  },
  root: {
    width: "100%",
    overflowX: "auto",
    maxWidth: 400,
    padding: 10,
  },
  table: {
    minWidth: 405
  },
  tableTitle: {
    margin: 10
  },
  sizeDescriptionWrap: {
    width: 500,
    padding: 10,
  },
  sizeDescriptionContent: {
    whiteSpace: "pre-wrap",
  },
  sizeDescriptionTitle: {
    fontWeight: bold,
  },
  sideBarWrap: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  }
};

export default styles;
