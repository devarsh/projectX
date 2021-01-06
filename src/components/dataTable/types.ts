export interface GridColumnType {
  columnName: string;
  accessor: string;
  sequence: number;
  componentType: "default" | "date" | "currency";
  Cell?: any;
  Filter?: any;
  filterComponentType?: "valueFilter" | "rangeFilter" | "optionsFilter";
  filterComponentProps?: {
    type: string;
  };
  disableFilters?: boolean;
  alignment?: string;
  TableCellProps?: any;
  disableSortBy?: boolean;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  isVisible?: boolean;
  sortDescFirst?: boolean;
  dateFormat?: string;
}

export interface GridConfigType {
  dense?: boolean;
  pageSize?: number[];
  defaultPageSize?: number;
  gridLabel: string;
  rowIdColumn: string;
  allowColumnReordering?: boolean;
  allowColumnHiding?: boolean;
  allowKeyboardNavigation?: boolean;
  allowGlobalFilter?: boolean;
  defaultColumnConfig: {
    width?: number;
    maxWidth?: number;
    minWidth?: number;
  };
}

export interface HeaderFilterType {
  accessor: string;
  columnName: string;
  level: number;
  filterComponentProps: any;
  filterComponentType: string;
}

export interface GridMetaDataType {
  columns: GridColumnType[];
  gridConfig: GridConfigType;
  hiddenColumns?: string[];
  headerFilters?: HeaderFilterType[];
  actions?: ActionTypes[];
  setAction?: any;
}

export interface ActionTypes {
  actionName: string;
  actionLabel: string;
  actionIcon?: any;
  tooltip?: string;
  multiple: boolean;
}
