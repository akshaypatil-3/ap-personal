import React, { useEffect, useState } from "react";
import { DataTableProps } from "./type";
import "./datatable.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import { manageColumnsWidth } from "./utils";

const DataTable = <T extends any>(props: DataTableProps<T>): JSX.Element => {
  const [windowSize, handleWindowResize] = useWindowSize();
  const [gridTemplateCol, setGridTemplateCol] = useState<string>("");

  useEffect(() => {
    const templaceCol = manageColumnsWidth(props.columns, windowSize.width);
    setGridTemplateCol(templaceCol);
  }, [props.columns, windowSize]);
  const renderColumns = () => {
    return (
      <>
        {props.columns
          .filter((col) => col.isVisible || col.isVisible === undefined)
          .map((col, index) => {
            return (
              <div
                style={{ gridColumnStart: index + 1 }}
                className={`cell ${col.styleName}`}
              >
                {col.headerName}
              </div>
            );
          })}
      </>
    );
  };

  const renderRow = (row: T, rIndex: number) => {
    return (
      <>
        {props.columns &&
          row &&
          props.columns
            .filter((col) => col.isVisible || col.isVisible === undefined)
            .map((col, colIndex) => {
              const val: any = row[col.fieldName as keyof object] || "";
              return (
                <div
                  style={{ gridColumnStart: colIndex + 1 }}
                  className={`cell ${col.styleName}`}
                  key={`${col.fieldName}_${colIndex}_${rIndex}`}
                >
                  {col && col.rerender ? col.rerender?.(row, rIndex + "") : val}
                </div>
              );
            })}
      </>
    );
  };
  const renderRows = () => {
    return (
      <>
        {props.rows &&
          props.rows.map((row: T, index: number) => {
            return (
              <div key={`row_${index}`} className="row">
                {renderRow(row, index)}
              </div>
            );
          })}
      </>
    );
  };
  return (
    <div className="dataTableWrapper">
      {props.header && <div className="tableTitle">{props.header}</div>}
      <div
        className="dataTable"
        style={{ gridTemplateColumns: gridTemplateCol }}
      >
        <div className="columns">{renderColumns()}</div>
        <div className="rows">{renderRows()}</div>
      </div>
    </div>
  );
};

export default DataTable;
