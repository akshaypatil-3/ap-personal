import React, { useContext } from "react";
import { DataGridContext, DataGridContextProp } from "./DataGridContext";
import { getAlignStyle } from "./utils";
import MoreColumnSidebar from "./morecolumnssidebar/MoreColumnSidebar";

interface RowProps<T> {
  rowIndex: number;
  data: T;
}
const Row = <T extends any>({ data, rowIndex }: RowProps<T>): JSX.Element => {
  const { columns, handleRowClick } = useContext(DataGridContext);
  let sIndex = 0;
  return (
    <div
      className="flex gridRow"
      onClick={() => handleRowClick && handleRowClick(data)}
    >
      {columns &&
        data &&
        columns
          .filter((col) => col.isVisible || col.isVisible === undefined)
          .map((col) => {
            sIndex++;
            const val: any = data[col.fieldName as keyof object] || "";
            return (
              <div
                key={`${col.fieldName}-${rowIndex}-${col.index}`}
                style={{ gridColumnStart: sIndex }}
                className={`gridCol`}
              >
                <div className={getAlignStyle(col.alignItem)}>
                  {col && col.rerender ? col.rerender?.(data) : val}
                </div>
              </div>
            );
          })}

      <div
        key={`moreColumn-${rowIndex}`}
        style={{ gridColumnStart: sIndex+1 }}
        className={`gridCol moreColGridCol`}
      >
        <div className={getAlignStyle('center')}>
          <MoreColumnSidebar {...{columns: columns, data:data}} />
        </div>
      </div>
    </div>
  );
};
export default Row;
