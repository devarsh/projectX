export const YearlyTargetGridMetaData = {
  columns: [
    {
      columnName: "Serial No",
      componentType: "default",
      accessor: "serialNo",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "User ID",
      componentType: "default",
      accessor: "userID",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "User Name",
      componentType: "default",
      accessor: "userName",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Target Year",
      componentType: "default",
      accessor: "targetYear",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Remarks",
      componentType: "default",
      accessor: "remarks",
      sequence: 5,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Yearly Target",
    rowIdColumn: "serialNo",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableGroupBy: true,
    disableSorting: true,
    hideHeader: false,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};
