import { GridMetaDataType, GridColumnType } from "components/dataTableStatic";

export const gridMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "File ID",
      componentType: "default",
      accessor: "id",
      sequence: 0,
      alignment: "left",
      isVisible: false,
    },
    {
      columnName: "File Name",
      componentType: "default",
      accessor: "name",
      sequence: 1,
      alignment: "left",
      width: 300,
      maxWidth: 300,
      minWidth: 100,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
    },
    {
      columnName: "Size",
      componentType: "default",
      accessor: "sizeStr",
      sequence: 2,
      alignment: "left",
      width: 100,
      maxWidth: 100,
      minWidth: 100,
    },
    {
      columnName: "Type",
      componentType: "default",
      accessor: "fileExt",
      sequence: 3,
      alignment: "left",
      width: 100,
      maxWidth: 100,
      minWidth: 100,
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Bank Statement",
    rowIdColumn: "id",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    disableGlobalFilter: true,
    disableGroupBy: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};

export const columnsMetaData: GridColumnType[] = [
  {
    columnName: "Bank",
    componentType: "editableAutocomplete",
    accessor: "bankID",
    sequence: 4,
    alignment: "left",
    options: "getPerfiosBankList",
    schemaValidation: {
      type: "string",
      rules: [{ name: "required", params: ["required"] }],
    },
  },
  {
    columnName: "Document Type",
    componentType: "editableAutocomplete",
    accessor: "docType",
    sequence: 4,
    alignment: "left",
    options: "getBankDocType",
    schemaValidation: {
      type: "string",
      rules: [{ name: "required", params: ["required"] }],
    },
  },
  {
    columnName: "Password",
    componentType: "editableTextField",
    accessor: "password",
    sequence: 4,
    alignment: "left",
    isPassword: true,
  },
  {
    columnName: "Remarks",
    componentType: "editableTextField",
    accessor: "remarks",
    sequence: 4,
    alignment: "left",
  },
];
