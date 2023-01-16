import React, { useContext } from "react";
import { ColumnDef, Types } from "../../type";
import { FilterOptionContext } from "../FilterOptionContext";
import DateFilter from "./DateFilter";
import DateTimeFilter from "./DateTimeFilter";
import NumberFilter from "./NumberFilter";
import OptionsFilter from "./OptionsFilter";
import StringFilter from "./StringFilter";

const handleTypes = <T extends any>(col: ColumnDef<T>) => {
  const { dataType, options } = col;

  if (dataType === "OPTIONS" && (!options || options.length == 0)) {
    console.error("must be send options in column config");
  }

  switch (dataType) {
    case "OPTIONS":
      return <OptionsFilter />;
      break;
    case "DATE":
      return <DateFilter />;
      break;
    case "DATE_TIME":
      return <DateTimeFilter />;
      break;
    case "STRING":
      return <StringFilter />;
      break;
    case "NUMBER":
      return <NumberFilter />;
      break;
    default:
      return <StringFilter />;
  }
};

const FilterTypes = (): JSX.Element => {
  const { columnData } = useContext(FilterOptionContext);
  return <>{handleTypes(columnData)}</>;
};
export default FilterTypes;
