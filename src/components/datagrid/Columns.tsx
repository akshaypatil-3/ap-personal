import React, { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "../icons/FontAwesomeIcons";
import AdvanceOptions from "./advanceoptions/AdvanceOptions";
import HeaderCell from "./HeaderCell";
import { ColumnDef } from "./type";

interface ColumnProps<T> {
  data: ColumnDef<T>[];
}

const Columns = <T extends any>({ data }: ColumnProps<T>): JSX.Element => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const defaultAdvanceOptions: ColumnDef<any> = {
    fieldName: "_advanceOption",
    sortable: false,
    headerName: "",
    rerenderHeader: () => (
      <div onClick={handleOnClick} className="advOptions">
        {EllipsisVerticalIcon}
        {isShow && <AdvanceOptions columns={data} />}
      </div>
    ),
    rerender: <T extends any>(data: T) => {
      return <>:</>;
    },
    width: "40px",
  };

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShow(true);
  };

  const hideAdvanceOption = () => {
    setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      hideAdvanceOption();
    });
    return () => {
      window.removeEventListener("click", hideAdvanceOption);
    };
  }, []);

  let sIndex = 0;
  return (
    <div className="gridHeader">
      {data &&
        data
          .filter((col) => col.isVisible || col.isVisible === undefined)
          .map((column) => {
            sIndex++;
            return (
              <HeaderCell
                key={column.fieldName + column.index}
                {...{ column, gridColumnStartIndex: sIndex }}
              />
            );
          })}

      <HeaderCell
        key={defaultAdvanceOptions.fieldName}
        {...{ column: defaultAdvanceOptions, gridColumnStartIndex: sIndex + 1, gridColumnClass: 'advanceFilterGridCol' }}
      />
    </div>
  );
};
export default Columns;
