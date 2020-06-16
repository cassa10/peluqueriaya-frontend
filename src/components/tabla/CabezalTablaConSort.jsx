import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const CabezalTablaConSort = ({
  classes,
  order,
  orderBy,
  onRequestSort,
  columnas,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnas.map((columna) => (
          <TableCell
            key={columna.id}
            sortDirection={orderBy === columna.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === columna.id}
              direction={orderBy === columna.id ? order : "asc"}
              onClick={createSortHandler(columna.id)}
            >
              {columna.label}
              {orderBy === columna.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

CabezalTablaConSort.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string,
  columnas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CabezalTablaConSort;
