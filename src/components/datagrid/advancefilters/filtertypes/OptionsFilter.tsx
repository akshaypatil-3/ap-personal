import React, { useContext, useEffect, useState } from "react";
import { Options } from "../../type";
import ".././advancefilters.scss";
import { FilterOptionContext } from "../FilterOptionContext";

const OptionsFilter = (): JSX.Element => {
  const {
    columnData,
    appliedFilterData,
    handleApplyFilter,
    handleClearFilter,
  } = useContext(FilterOptionContext);
  const [options, setOptions] = useState<string[]>(
    appliedFilterData &&
      columnData.fieldName &&
      appliedFilterData[columnData.fieldName]
      ? appliedFilterData[columnData.fieldName]?.value
      : []
  );
  useEffect(() => {
    const opts =
      appliedFilterData &&
      columnData.fieldName &&
      appliedFilterData[columnData.fieldName]
        ? appliedFilterData[columnData.fieldName]?.value
        : [];
    setOptions(opts);
  }, [appliedFilterData]);

  const handleFilter = () => {
    const data: { [key: string]: any } = {};
    data[columnData.fieldName as keyof object] = {
      type: "OPTIONS",
      label: columnData.headerName,
      value: options,
    };
    handleApplyFilter(data);
  };

  const handleCheckboxChange = (e: any) => {
    if (e.target.checked) {
      setOptions([...options, e.target.value]);
    } else {
      setOptions(options.filter((opt) => opt !== e.target.value));
    }
  };

  return (
    <div className="filterOptionDropdown optionFilter">
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
          {columnData &&
            columnData.options &&
            columnData.options?.map((option: Options, index) => {
              return (
                <div className="checkbox" key={option.optionId}>
                  <input
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    checked={
                      options.indexOf(option.optionId) !== -1 ? true : false
                    }
                    id={option.optionId}
                    value={option.optionId}
                  />
                  <label htmlFor="store1">{option.optionValue}</label>
                </div>
              );
            })}
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

export default OptionsFilter;
