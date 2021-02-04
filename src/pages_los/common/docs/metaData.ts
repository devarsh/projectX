import { GridMetaDataType } from "components/dataTableStatic";

const metaData: GridMetaDataType = {
  columns: [
    {
      columnName: "First Name",
      componentType: "default",
      accessor: "firstName",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Last Name",
      componentType: "default",
      accessor: "lastName",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Age",
      componentType: "default",
      accessor: "age",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Visits",
      componentType: "default",
      accessor: "visits",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Progress",
      componentType: "default",
      accessor: "progress",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Status",
      componentType: "default",
      accessor: "status",
      sequence: 0,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "File Listing",
    rowIdColumn: "firstName",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
  },
};

export default metaData;
