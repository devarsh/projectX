import { ActionTypes } from "components/dataTable/types";

export interface GridColumnType {
  columnName: string;
  accessor: string;
  sequence: number;
  componentType:
    | "default"
    | "date"
    | "currency"
    | "editableTextField"
    | "editableAutocomplete";
  Cell?: any;
  alignment?: string;
  TableCellProps?: any;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  sortDescFirst?: boolean;
  dateFormat?: string;
  isVisible?: boolean;
  validation?: any;
  options?: any;
}

export interface GridConfigType {
  dense?: boolean;
  gridLabel: string;
  rowIdColumn: string;
  defaultColumnConfig: {
    width?: number;
    maxWidth?: number;
    minWidth?: number;
  };
  allowColumnReordering?: boolean;
}

export interface GridMetaDataType {
  columns: GridColumnType[];
  hiddenColumns?: string[];
  gridConfig: GridConfigType;
  actions?: ActionTypes[];
  setAction?: any;
}

export interface GridWrapperPropTypes {
  finalMetaData: GridMetaDataType;
  actions?: ActionTypes[];
  setAction?: any;
  data: any;
  setData: any;
}
