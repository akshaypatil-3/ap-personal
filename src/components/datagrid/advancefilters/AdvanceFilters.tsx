import React, { useEffect, useState } from "react";
import { BarsListIcon } from "../../icons/FontAwesomeIcons";

import { AdvaceFilterProps, AppliedFilterType, ColumnDef } from "../type";

import FilterOption from "./FilterOption";
import AppliedFilter from "./AppliedFilter";
import { FilterOptionContext } from "./FilterOptionContext";

import "./advancefilters.scss";

const AdvanceFilter = <T extends any>({
  columns,
  serverSide,
}: AdvaceFilterProps<T>): JSX.Element => {
  useEffect(() => {}, [columns]);
  const [isShowFilters, setIsShowFilters] = useState<boolean>(false);
  const [appliedFilterData, setAppliedFilterData] = useState<{
    [key: string]: AppliedFilterType;
  }>({});
  const [selectedAdFilterName, setSelectedAdFilterName] = useState<string>("");
  const [selectedApFilterName, setSelectedApFilterName] = useState<string>("");

  const handleFiltersDisplay = () => {
    setIsShowFilters(!isShowFilters);
    setSelectedAdFilterName("");
    setSelectedApFilterName("");
  };

  const handleFilterOptionTypeVisibility = (fieldName: string) => {
    setSelectedAdFilterName(fieldName);
  };

  const handleAppliedFilterTypeVisibility = (fieldName: string) => {
    setIsShowFilters(false);
    setSelectedAdFilterName("");
    setSelectedApFilterName(fieldName);
  };

  const handleApplyFilter = (filter: { [key: string]: AppliedFilterType }) => {
    setAppliedFilterData({ ...appliedFilterData, ...filter });
  };

  const handleClearFilter = (fieldName: string) => {
    const apFilters = Object.keys(appliedFilterData).reduce(
      (a: any, k: string) => {
        if (k !== fieldName) {
          a[k as keyof object] = appliedFilterData[k];
        }
        return a;
      },
      {}
    );
    setAppliedFilterData(apFilters);
  };
  const renderFilterOption = () => {
    return (
      <>
        {columns &&
          columns.map(
            (col: ColumnDef<T>) =>
              (col.allowFilter === undefined || col.allowFilter) && (
                <FilterOptionContext.Provider
                  value={{
                    columnData: col,
                    appliedFilterData,
                    handleApplyFilter,
                    handleFilterOptionTypeVisibility,
                    handleAppliedFilterTypeVisibility,
                    handleClearFilter,
                  }}
                >
                  <FilterOption {...{ selectedAdFilterName }} />
                </FilterOptionContext.Provider>
              )
          )}
      </>
    );
  };

  const renderAppliedFilters = () => {
    return (
      <>
        {columns &&
          appliedFilterData &&
          columns.map(
            (col: ColumnDef<T>) =>
              (col.allowFilter === undefined ||
                (col.allowFilter && appliedFilterData[col.fieldName])) && (
                <FilterOptionContext.Provider
                  value={{
                    columnData: col,
                    appliedFilterData,
                    handleApplyFilter,
                    handleFilterOptionTypeVisibility,
                    handleAppliedFilterTypeVisibility,
                    handleClearFilter,
                  }}
                >
                  <AppliedFilter {...{ selectedApFilterName }} />
                </FilterOptionContext.Provider>
              )
          )}
      </>
      // <>
      //   {Object.keys(appliedFilterData)?.map((fieldName: string) => {
      //     const filtered = appliedFilterData[fieldName];
      //     return (
      //       <>
      //         <AppliedFilter
      //           {...{ filtered, fieldName, columns, handleClearFilter }}
      //         />
      //       </>
      //     );
      //   })}
      // </>
    );
  };

  return (
    <div className="advanceFilters filtersWrapper">
      <div className="filterButtonWrapper">
        <button
          type="button"
          className="btn btnDanger btnFilters"
          onClick={handleFiltersDisplay}
        >
          {BarsListIcon}
        </button>
      </div>
      {isShowFilters && (
        <div className="filtersDropdown">{renderFilterOption()}</div>
      )}

      <div className="appliedFiltersWrapper">{renderAppliedFilters()}</div>
    </div>
  );
};

export default AdvanceFilter;
