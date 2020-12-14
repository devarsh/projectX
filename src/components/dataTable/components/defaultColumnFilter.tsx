import TextField from "@material-ui/core/TextField";

export const DefaultColumnFilter = (props) => {
  const {
    column: { filterValue, filterComponentProps, preFilteredRows, setFilter },
  } = props;

  return (
    <TextField
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value); // Set undefined to remove the filter entirely
      }}
    />
  );
};
