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
  allowColumnReorder?: boolean;
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
  Filter?: any;
  filterComponentType: string;
  filterComponentProps: any;
  query?: {
    accessor: string;
    result_type: string;
    filter_conditions: any[];
  };
  level: number;
}

export type HeaderFilterMultiType = HeaderFilterType[] | Promise<any[]>;

export interface GridMetaDataType {
  columns: GridColumnType[];
  gridConfig: GridConfigType;
  hiddenColumns?: string[];
  headerFilters?: HeaderFilterType[] | Promise<any[]>;
}
