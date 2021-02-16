import { GridMetaDataType } from "components/dataTableStatic";

export const BankMasterCFGridMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "Name of Bank",
      componentType: "default",
      accessor: "bankTranCode",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Branch Name",
      componentType: "default",
      accessor: "branchName",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Department of The Bank",
      componentType: "default",
      accessor: "departmentName",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Location of Scheme",
      componentType: "default",
      accessor: "schemaLocation",
      sequence: 3,
      alignment: "left",
    },

    {
      columnName: "Type of Scheme",
      componentType: "default",
      accessor: "schemaType",
      sequence: 4,
      alignment: "left",
    },

    {
      columnName: "Type of Facility",
      componentType: "default",
      accessor: "facilityType",
      sequence: 5,
      alignment: "left",
    },

    {
      columnName: "Land Value(As per Books)(Lacs)",
      componentType: "default",
      accessor: "booksLandValue",
      sequence: 6,
      alignment: "left",
    },
    {
      columnName: "Land Value(Market Value Lacs)",
      componentType: "default",
      accessor: "marketLandValue",
      sequence: 7,
      alignment: "left",
    },
  ],

  gridConfig: {
    dense: true,
    gridLabel: "Bank Master of Infra",
    rowIdColumn: "refID",
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
