import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateToString } from "../../../../utils/common";

import ".././advancefilters.scss";
import { FilterOptionContext } from "../FilterOptionContext";
import { FilterDateType } from "./types";

const DateFilter = (): JSX.Element => {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const {
    columnData,
    handleApplyFilter,
    handleClearFilter,
    appliedFilterData,
  } = useContext(FilterOptionContext);

  const [filterValue, setFilterValue] = useState<FilterDateType>(
    appliedFilterData &&
      columnData.fieldName &&
      appliedFilterData[columnData.fieldName]
      ? appliedFilterData[columnData.fieldName]?.value
      : { startDate: new Date(), endDate: new Date() }
  );

  const handleSetFilter = (fieldName: string, date: Date) => {
    setFilterValue({ ...filterValue, [fieldName]: date });
  };

  const handleFilter = () => {
    const data: { [key: string]: any } = {};
    data[columnData.fieldName as keyof object] = {
      type: "DATE",
      label: columnData.headerName,
      value: filterValue,
    };
    handleApplyFilter(data);
  };

  return (
    <div className="filterOptionDropdown dateFilter">
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
          <div className="filterTitle">Date Range</div>

          <div className="dateRangeWrapper">
            <div className="dateRangeInputBox">
              <label className="label" htmlFor="fromDate">
                From
              </label>
              <DatePicker
                selected={filterValue.startDate}
                onChange={(date) => date && handleSetFilter("startDate", date)}
                selectsStart
                dateFormat="MMM dd, yyyy"
                className="dateRangeInput"
              />
            </div>
            <div className="dateRangeInputBox">
              <label className="label" htmlFor="toDate">
                To
              </label>
              <DatePicker
                selected={filterValue.endDate}
                onChange={(date) => date && handleSetFilter("endDate", date)}
                selectsEnd
                minDate={fromDate}
                dateFormat="MMM dd, yyyy"
                className="dateRangeInput"
              />
            </div>
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

export default DateFilter;
