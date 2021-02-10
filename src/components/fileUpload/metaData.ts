import { GridMetaDataType } from "components/dataTableStatic";

const metaData: GridMetaDataType = {
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
      componentType: "editableTextField",
      accessor: "name",
      sequence: 1,
      alignment: "left",
      width: 500,
      maxWidth: 600,
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
    },
    {
      columnName: "Type",
      componentType: "default",
      accessor: "fileExt",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Bank",
      componentType: "default",
      accessor: "bank",
      sequence: 3,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Files",
    rowIdColumn: "id",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    hideHeader: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};

export default metaData;
