import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";

const useStyles = makeStyles(() => styles);

function splitIntoSubArray(arr, count) {
  const copyArr = [...arr];
  var newArray = [];
  while (copyArr.length > 0) {
    newArray.push(copyArr.splice(0, count));
  }
  return newArray;
}

const createTable = (objTableData, classes) => {
  if (!objTableData) return null;

  return Object.entries(JSON.parse(objTableData)).map(([tableTitle, tableData]) => {
    if (!Array.isArray(tableData)) return null;
    const countCellInRow = tableData.findIndex(i => !/[а-я:,;]{3,}/i.test(i));
    const convertedArr = splitIntoSubArray(tableData, countCellInRow);

    return (
      <div>
        <div className={classes.tableTitle}>{tableTitle}:</div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableHeaderRow}>
                {convertedArr[0].map(headItem => (
                  <TableCell key={headItem} className={classes.tableHeadCell}>
                    {headItem}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {convertedArr
                .filter((val, index) => index !== 0)
                .map(row => (
                  <TableRow key={row[0]} className={classes.tableRow}>
                    {row.map((cellContent, i) => (
                      <TableCell key={i} className={classes.tableCell}>
                        {cellContent}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  });
};

function SimpleTable(props) {
  const classes = useStyles();
  return <div>{createTable(props.data, classes)}</div>;
}

export default SimpleTable;
