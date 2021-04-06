import { GridMetaDataType } from "components/dataTableStatic";

export const MetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "Version No",
      componentType: "default",
      accessor: "serialNo",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Initiated Date",
      componentType: "date",
      accessor: "initiatedDate",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Status",
      componentType: "default",
      accessor: "status",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Generated Date",
      componentType: "date",
      accessor: "lastUpdateDate",
      sequence: 3,
      alignment: "left",
    },
  ],

  gridConfig: {
    dense: true,
    gridLabel: "CAM Transactions",
    rowIdColumn: "serialNo",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: false,
    disableGroupBy: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};
