import Tooltip from "@material-ui/core/Tooltip";

export const DefaultRowCellRenderer = (props) => {
  const {
    value,
    column: { showTooltip = false },
  } = props;
  let result = (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
  return showTooltip ? <Tooltip title={value}>{result}</Tooltip> : result;
};
