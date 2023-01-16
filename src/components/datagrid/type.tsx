export type ORDER = "asc" | "desc";
export type ALIGN = "left" | "right" | "center";
export type Types = "OPTIONS" | "STRING" | "DATE" | "DATE_TIME" | "NUMBER";

export interface DataGridProps<T> {
  columns: ColumnDef<T>[];
  rows: T[];
  indicators?: IndicatorProps[];
  showAdvanceFilter?: boolean;
  serverSidePagination?: boolean;
  totalRecods?: number;
  activePage?: number;
  handlePageSizeChange?: () => void;
  handlePageClick?: () => void;
  handleColumnSort?: () => void;
  handleRowClick?: (data: T) => void;
}

export interface Options {
  optionId: string;
  optionValue: string;
}

export interface ColumnDef<T> {
  fieldName: string;
  sortable?: boolean;
  hidden?: boolean;
  headerName: string;
  isVisible?: boolean;
  index?: number;
  rerenderHeader?: () => JSX.Element;
  rerenderTag?: (e: JSX.Element) => JSX.Element;
  width?: string;
  maxWidth?: string;
  order?: ORDER;
  dataType?: Types;
  allowFilter?: boolean;
  moreColumn?: boolean;
  filterValues?: any;
  alignItem?: ALIGN;
  options?: Options[];

  rerender?: (data: T) => JSX.Element;
}

export interface AppliedFilterType {
  type: Types;
  label: string;
  value: any;
}
export interface AdvaceFilterProps<T> {
  columns: ColumnDef<T>[];
  appliedFilters?: { string: AppliedFilterType };
  serverSide: boolean;
  doSearch?: (search: any) => {};
}

export interface IndicatorProps {
  icon: () => JSX.Element;
  iconClass?: string;
  label: string;
}

export interface IndicatorInfoProps<> {
  indicators?: IndicatorProps[];
}
