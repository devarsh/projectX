export interface GridMetaData {
  columnName: string;
  accessor: string;
  sequence: Number;
  componentType: "default";
  disableSortBy?: boolean;
  disableFilters?: boolean;
  filterComponentType?: "ValueFilter" | "RangeFilter" | "OptionsFilter";
  filterComponentProps?: "Single" | "Multiple";
  width?: Number;
  maxWidth?: Number;
  minWidth?: Number;
}
