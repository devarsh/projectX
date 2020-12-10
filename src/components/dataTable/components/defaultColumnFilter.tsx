import TextField from "@material-ui/core/TextField";

export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  return (
    <TextField
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value); // Set undefined to remove the filter entirely
      }}
    />
  );
};
