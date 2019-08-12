import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    "& b": {
      fontWeight: theme.typography.fontWeightMedium
    }
  }
}))(Tooltip);

function Tooltips({ children, title }) {
  return <HtmlTooltip title={title}>{children}</HtmlTooltip>;
}

export default Tooltips;
