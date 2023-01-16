import React, { useContext, useEffect, useState } from "react";
import { AngleDownIcon, AngleUpIcon } from "../icons/FontAwesomeIcons";
import { DataGridContext } from "./DataGridContext";
import { ALIGN, ColumnDef, ORDER } from "./type";
import { ASC, getAlignStyle } from "./utils";

const SortColumn = ({ order = ASC }: { order: ORDER }): JSX.Element => {
  return (
    <span className="shortIcon">
      {order === ASC ? AngleDownIcon : AngleUpIcon}
    </span>
  );
};

const HeaderCell = <T extends any>(props: {
  column: ColumnDef<T>;
  gridColumnStartIndex: number;
  gridColumnClass?: string;
}): JSX.Element => {
  const { columnSort } = useContext(DataGridContext);

  function sort() {
    if (props.column.sortable !== false) columnSort(props.column);
  }

  return (
    <div
      style={{ gridColumnStart: props.gridColumnStartIndex }}
      className={`gridCol ${props.gridColumnClass ? props.gridColumnClass : ''}`}
      onClick={sort}
    >
      <div className={getAlignStyle(props.column.alignItem)}>
        {props.column && props.column.rerenderHeader
          ? props.column.rerenderHeader()
          : props.column.headerName}
        {(props.column.sortable === undefined ||
          props.column.sortable === true) && (
          <SortColumn {...{ order: props.column.order || ASC }} />
        )}
      </div>
    </div>
  );
};

export default HeaderCell;
