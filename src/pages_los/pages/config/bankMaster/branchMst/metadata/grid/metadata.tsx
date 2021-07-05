export const bankBranchMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Branches",
    rowIdColumn: "branchID",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Bank Name",
      componentType: "default",
      accessor: "bankName",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Branch Name",
      componentType: "default",
      accessor: "branchName",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "IFSC Code",
      componentType: "default",
      accessor: "ifsc",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "City",
      componentType: "default",
      accessor: "city",
      sequence: 5,
      alignment: "left",
    },
  ],
};
