import React, { useContext, useEffect, useState } from "react";
import { DropDown } from "../../dropdown/DropDown";
import {
  AngleDownIcon,
  AngleUpIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  EyeSlashIcon,
  OrderIcon,
} from "../../icons/FontAwesomeIcons";
import { DataGridContext } from "../DataGridContext";
import { ColumnDef } from "../type";
import "./advanceoptions.scss";

interface Props<T> {
  columns: ColumnDef<T>[];
}
const AdvanceOptions = <T extends any>({ columns }: Props<T>) => {
  const { handleVisiblity, columnSort } = useContext(DataGridContext);
  const [sortableColumns, setSortableColumns] = useState<ColumnDef<T>[]>([]);
  const [showSortOption, setShowSortOption] = useState<boolean>(true);
  const [sortedColumnName, setSortedColumnName] = useState<string>("");
  const [sortedColumnOrder, setSortedColumnOrder] = useState<string>("");

  useEffect(() => {
    const sortableCols = columns.filter(
      (col: ColumnDef<T>) =>
        (!col.hidden &&
          (col.isVisible || col.isVisible === undefined) &&
          col.sortable) ||
        col.sortable === undefined
    );
    setSortableColumns(sortableCols);
  }, [columns]);

  const handleOrderOptionVisiblity = () => {
    setShowSortOption(!showSortOption);
  };

  useEffect(() => {
    const col: ColumnDef<T> | undefined = sortableColumns.find(
      (col) => col.fieldName === sortedColumnName
    );
    if (col && (col.sortable || col?.sortable === undefined)) {
      columnSort(col);
    }
  }, [sortedColumnName, sortedColumnOrder]);

  return (
    <div className="advaceOptions">
      <div className="mainHeader ">View Options</div>
      <div className="subHeader pt-2" onClick={handleOrderOptionVisiblity}>
        {OrderIcon}
        <span>Sort by</span>
        <div className="icon">
          {showSortOption ? AngleDownIcon : AngleUpIcon}
        </div>
      </div>
      {showSortOption && (
        <div className="sortByControls">
          <DropDown
            onChange={(val: any) => {
              setSortedColumnName(val);
            }}
            value={sortedColumnName}
            placeHolder=""
            labelFieldName="headerName"
            valueFieldName="fieldName"
            dropdownData={sortableColumns}
          />
          <DropDown
            onChange={(val: any) => {
              setSortedColumnOrder(val);
            }}
            value={sortedColumnOrder}
            placeHolder=""
            dropdownData={["Ascending", "Descending"]}
          />
        </div>
      )}
      <div className="pt-1 pl-1 opt-4">Shown</div>
      <div>
        {columns.map((col: ColumnDef<T>, index) => {
          const isVisible = col.isVisible === undefined || col.isVisible;
          if (!col.hidden)
            return (
              <div
                key={index}
                className="rowsVisibilty"
                onClick={() => {
                  handleVisiblity && handleVisiblity(col, !isVisible);
                }}
              >
                <span className="opt-3">
                  {/* {EllipsisVerticalIcon} */}
                  {/* {EllipsisVerticalIcon} */}
                </span>
                <span className="">{col.headerName} </span>
                <div className="icon">{isVisible ? EyeIcon : EyeSlashIcon}</div>
              </div>
            );
        })}
      </div>
    </div>
  );
};
export default AdvanceOptions;
