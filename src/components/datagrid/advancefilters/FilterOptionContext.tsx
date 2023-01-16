import React, { createContext, useContext } from "react";
import { AppliedFilterType, ColumnDef } from "../type";

interface FilerOptionContextType<T> {
  columnData: ColumnDef<T>;
  appliedFilterData?: { [key: string]: AppliedFilterType };
  handleApplyFilter: (filter: { [key: string]: AppliedFilterType }) => void;
  handleFilterOptionTypeVisibility: (string: any) => void;
  handleAppliedFilterTypeVisibility: (string: any) => void;
  handleClearFilter: (string: any) => void;
}
const initData: FilerOptionContextType<any> = {
  columnData: {} as ColumnDef<any>,
  handleApplyFilter: (filter: { [key: string]: AppliedFilterType }) => {},
  appliedFilterData: {},
  handleFilterOptionTypeVisibility: (string: any) => {},
  handleAppliedFilterTypeVisibility: (string: any) => {},
  handleClearFilter: (string: any) => {},
};
export const FilterOptionContext = createContext({ ...initData });
