export interface GridColumnType {
  columnName: string;
  accessor: string;
  sequence: number;
  componentType: "default";
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
}
