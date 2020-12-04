import { useMemo } from "react";
import { makeData } from "./makeData";
import { DataGrid } from "./grid";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

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
        props: {
          align: "right",
        },
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
        Cell: ({ value }) => <CircularProgressWithLabel value={value} />,
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
