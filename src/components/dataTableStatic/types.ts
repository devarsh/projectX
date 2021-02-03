export interface GridColumnType {
  columnName: string;
  accessor: string;
  sequence: number;
  componentType: "default" | "date" | "currency";
  Cell?: any;
  alignment?: string;
  TableCellProps?: any;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  sortDescFirst?: boolean;
  dateFormat?: string;
  isVisible?: boolean;
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
}
