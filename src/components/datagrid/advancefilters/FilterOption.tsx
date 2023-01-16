import React, { useContext } from "react";
import { ChevronRightIcon } from "../../icons/FontAwesomeIcons";

import { FilterOptionContext } from "./FilterOptionContext";
import FilterTypes from "./filtertypes/FilterTypes";

const FilterOption = <T extends any>(props: {
  selectedAdFilterName: string;
}): JSX.Element => {
  const { columnData, handleFilterOptionTypeVisibility } =
    useContext(FilterOptionContext);
  return (
    <div
      key={columnData.fieldName}
      className={`filterOption ${
        props.selectedAdFilterName === columnData.fieldName ? "active" : ""
      }`}
      onClick={() => handleFilterOptionTypeVisibility(columnData.fieldName)}
    >
      <div className="optionLabel">{columnData.headerName}</div>
      {ChevronRightIcon}
      {props.selectedAdFilterName === columnData.fieldName && <FilterTypes />}
    </div>
  );
};

export default FilterOption;
