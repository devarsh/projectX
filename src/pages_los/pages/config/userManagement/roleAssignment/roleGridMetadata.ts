export const RoleGridMetaData = {
  columns: [
    {
      columnName: "User ID",
      componentType: "default",
      accessor: "userID",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "User Name",
      componentType: "default",
      accessor: "userName",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Access Branch List",
      componentType: "default",
      accessor: "accessBranchList",
      sequence: 2,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "User Management",
    rowIdColumn: "userID",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    hideHeader: false,
    disableGroupBy: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};