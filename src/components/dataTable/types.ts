export interface GridColumnType {
  columnName: string;
  accessor: string;
  sequence: number;
  componentType: "default";
  disableSortBy?: boolean;
  disableFilters?: boolean;
  filterComponentType?: "ValueFilter" | "RangeFilter" | "OptionsFilter";
  filterComponentProps?: {
    type: string;
  };
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  isVisible?: boolean;
  alignment?: string;
  sortDescFirst?: boolean;
}

export interface GridConfigType {
  dense?: boolean;
  pageSize?: number[];
  defaultPageSize?: number;
  gridLabel: string;
  rowIdColumn: string;
  defaultColumnConfig: {
    width?: number;
    maxWidth?: number;
    minWidth?: number;
  };
}

export interface GridMetaDataType {
  columns: GridColumnType[];
  gridConfig: GridConfigType;
}

export interface TransformedGridColumnType {
  columnName: string;
  accessor: string;
  disableSortBy?: boolean;
  disableFilters?: boolean;
  filterComponentProps?: {
    type: string;
  };
  Cell: any;
  Filter: any;
  TableCellProps?: any;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  isVisible?: boolean;
  alignment?: string;
  sortDescFirst?: boolean;
}

export interface GridTransformedMetaDataType {
  columns: TransformedGridColumnType[];
  gridConfig: GridConfigType;
  hiddenColumns: string[];
}
