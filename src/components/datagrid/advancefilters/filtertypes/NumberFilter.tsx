import React, { useContext, useEffect, useState } from "react";
import ".././advancefilters.scss";
import { FilterOptionContext } from "../FilterOptionContext";

const NumberFilter = (): JSX.Element => {
  const {
    columnData,
    handleApplyFilter,
    handleClearFilter,
    appliedFilterData,
  } = useContext(FilterOptionContext);

  const [filterValue, setFilterValue] = useState<string[]>(
    appliedFilterData &&
      columnData.fieldName &&
      appliedFilterData[columnData.fieldName]
      ? appliedFilterData[columnData.fieldName]?.value
      : ""
  );

  const handleInputKeyUp = (e: any) => {
    setFilterValue(e.target.value);
  };

  const handleFilter = () => {
    const data: { [key: string]: any } = {};
    data[columnData.fieldName as keyof object] = {
      type: "STRING",
      label: columnData.headerName,
      value: filterValue,
    };
    handleApplyFilter(data);
  };

  useEffect(() => {
    const vl =
      appliedFilterData &&
      columnData.fieldName &&
      appliedFilterData[columnData.fieldName]
        ? appliedFilterData[columnData.fieldName]?.value
        : [];
    setFilterValue(vl);
  }, [appliedFilterData]);

  return (
    <div className="filterOptionDropdown numberFilter">
      <div className="optionContainer">
        <div
          className="clearWrapper"
          onClick={() => {
            handleClearFilter(columnData.fieldName);
          }}
        >
          <div className="clear">Clear</div>
        </div>
        <div className="filtersWrapper">
          <div className="inputBox">
            <label className="label" htmlFor="orderValue">
              Order Value
            </label>
            <input
              type="number"
              onChange={handleInputKeyUp}
              className="filterInput"
              value={filterValue}
              id="orderValue"
            />
          </div>
        </div>
      </div>
      <div className="actionContainer">
        <div
          className="applyAction"
          onClick={() => {
            handleFilter();
          }}
        >
          Apply Filter
        </div>
      </div>
    </div>
  );
};

export default NumberFilter;
