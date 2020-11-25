import { useMemo } from "react";
import { makeData } from "./makeData";
import { DataGrid } from "./grid";

export const DataTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  );

  const data = useMemo(() => makeData(10), []);
  const defaultColumn = useMemo(
    () => ({
      minWidth: 50,
      width: 150,
      maxWidth: 400,
    }),
    []
  );
  return (
    <DataGrid columns={columns} data={data} defaultColumn={defaultColumn} />
  );
};
