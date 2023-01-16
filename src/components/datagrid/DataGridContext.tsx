import { createContext, useContext } from "react";
import { ColumnDef } from "./type";

export interface DataGridContextProp<T> {
  columns: ColumnDef<T>[];
  columnSort: (col: ColumnDef<T>) => void;
  handleVisiblity?: (col: ColumnDef<T>, isVisible: boolean) => void;
  handleRowClick?: (data: T) => void;
}
const initDGContextData: DataGridContextProp<any> = {
  columns: [],
  columnSort: (col: ColumnDef<any>) => {
    console.error("no implementation found for columnSort");
  },
  handleRowClick: (data: any) => {
    console.error("no implementation found for handleRowClick");
  },
};
export const DataGridContext = createContext(initDGContextData);
