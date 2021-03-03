import { GridMetaDataType } from "components/dataTableStatic";

export const BankMasterGridMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "Name of Bank",
      componentType: "default",
      accessor: "bankTranCode",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Bank Ref code",
      componentType: "default",
      accessor: "bankRefCode",
      sequence: 2,
      alignment: "left",
      isVisible: false,
    },
    {
      columnName: "Branch Name",
      componentType: "default",
      accessor: "branchName",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Vintage of Business",
      componentType: "default",
      accessor: "businessVintage",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Name of Department",
      componentType: "default",
      accessor: "departmentName",
      sequence: 5,
      alignment: "left",
    },
    {
      columnName: "Product Name",
      componentType: "default",
      accessor: "productName",
      sequence: 6,
      alignment: "left",
    },

    {
      columnName: "Age of main Promoters",
      componentType: "default",
      accessor: "promotorAge",
      sequence: 7,
      alignment: "left",
    },

    {
      columnName: "Bank Ref code",
      componentType: "default",
      accessor: "refID",
      sequence: 8,
      alignment: "left",
      isVisible: false,
    },
  ],

  gridConfig: {
    dense: true,
    gridLabel: "Bank Master of SME",
    rowIdColumn: "refID",
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
