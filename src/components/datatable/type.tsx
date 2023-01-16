export interface DataTableProps<T> {
  header?: JSX.Element;
  uniqueId?: number;
  columns: DTColumnDef<T>[];
  rows: T[];
}

export interface DTColumnDef<T> {
  fieldName: string;
  headerName: string;
  isVisible?: boolean;
  styleName: string;
  width?: string;
  rerender?: (data: T, index: string) => JSX.Element;
}
