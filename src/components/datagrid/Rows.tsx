import React from "react";
import Row from "./Row";

interface RowsProps<T> {
  data: T[];
  rerender?: (data: any) => JSX.Element;
}
const Rows = <T extends any>({ data }: RowsProps<T>): JSX.Element => {
  return (
    <div className="gridContent">
      {data &&
        data.map((row: T, index) => (
          <Row key={index} {...{ data: row, rowIndex: index }} />
        ))}
    </div>
  );
};
export default Rows;
