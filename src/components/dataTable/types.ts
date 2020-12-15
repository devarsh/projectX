export interface GridColumnType {
  columnName: String;
  accessor: String;
  sequence: Number;
  componentType: "default";
  disableSortBy?: Boolean;
  disableFilters?: Boolean;
  filterComponentType?: "ValueFilter" | "RangeFilter" | "OptionsFilter";
  filterComponentProps?: {
    type: String;
  };
  width?: Number;
  maxWidth?: Number;
  minWidth?: Number;
  isVisible?: Boolean;
  alignmnent?: String;
  sortDescFirst?: Boolean;
}

export interface GridConfigType {
  dense?: Boolean;
  pageSize?: Number[];
  defaultPageSize?: Number;
  gridLabel: String;
  rowIDColumn: String;
  defaultColumnConfig: {
    width?: Number;
    maxWidth?: Number;
    minWidth?: Number;
  };
}

export interface GridMetaDataType {
  columns: GridColumnType[];
  gridConfig: GridConfigType;
}
