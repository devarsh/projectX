import { format } from "date-fns";

export const DateRowCellRenderer = (props) => {
  const { value } = props;
  const date = new Date(value);
  return (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {format(date, "dd/MM/yyyy")}
    </span>
  );
};
