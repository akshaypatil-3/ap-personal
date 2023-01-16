import React, { useContext, useEffect, useState } from "react";
import { DateToString } from "../../../utils/common";
import {
  FilterIcon,
  StatusIcon,
  XmarkIcon,
} from "../../icons/FontAwesomeIcons";
import { AppliedFilterType, ColumnDef, Types } from "../type";

import { FilterOptionContext } from "./FilterOptionContext";
import FilterTypes from "./filtertypes/FilterTypes";

interface AFProps<T> {
  selectedApFilterName: string;
}
const AppliedFilter = <T extends any>(props: AFProps<T>): JSX.Element => {
  const {
    columnData,
    appliedFilterData,
    handleAppliedFilterTypeVisibility,
    handleClearFilter,
  } = useContext(FilterOptionContext);
  const filteredData =
    appliedFilterData && appliedFilterData[columnData.fieldName];

  const renderValuesByType = (type: Types, value: any) => {
    switch (type) {
      case "OPTIONS":
        return (
          value && value.map((vl: string) => <div className="pr-1">{vl}, </div>)
        );
        break;

      case "STRING" || "NUMBER":
        return <div className="pr-1">{value}</div>;
        break;

      case "DATE_TIME":
        const sdStrt = DateToString(value.startDate);
        const edStrt = DateToString(value.endDate);
        return (
          <div className="pr-1">{`${sdStrt} to ${edStrt} to , ${value.startTime} to ${value.endTime}`}</div>
        );
        break;

      case "DATE":
        const sdStr = DateToString(value.startDate);
        const edStr = DateToString(value.endDate);
        return <div className="pr-1">{`${sdStr} to ${edStr}`}</div>;
        break;
    }
  };

  const renderTag = () => {
    return filteredData ? (
      <>
        <div className="filterColumn">{filteredData.label}</div>
        <div className="filterValues displayFlex">
          {renderValuesByType(filteredData.type, filteredData.value)}
        </div>
        <div
          className="filterClose"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClearFilter(columnData.fieldName);
          }}
        >
          {XmarkIcon}
        </div>
      </>
    ) : (
      <></>
    );
  };

  return (
    filteredData &&
    filteredData.value && (
      <div
        className="appliedFilterItemWrapper"
        key={columnData?.fieldName}
        onClick={() => handleAppliedFilterTypeVisibility(columnData.fieldName)}
      >
        <div className={`appliedFilterItem `}>
          {columnData && columnData.rerenderTag ? (
            columnData.rerenderTag(renderTag())
          ) : (
            <>
              <div>{FilterIcon}</div>
              {renderTag()}
            </>
          )}
        </div>
        {props.selectedApFilterName === columnData.fieldName && <FilterTypes />}
      </div>
    )
  );
};

export default AppliedFilter;
