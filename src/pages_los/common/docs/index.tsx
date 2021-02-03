import { useMemo } from "react";
import Grid, { GridMetaDataType } from "components/dataTableStatic";
import makeData from "./makeData";

const metaData: GridMetaDataType = {
  columns: [
    {
      columnName: "First Name",
      componentType: "default",
      accessor: "firstName",
      sequence: 0,
      alignment: "left",
      width: 300,
      minWidth: 100,
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

export const GridTable = () => {
  const data = useMemo(() => makeData(20), []);

  return <Grid finalMetaData={metaData} data={data} />;
};
