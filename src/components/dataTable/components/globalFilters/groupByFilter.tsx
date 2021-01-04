import { Fragment, useEffect, useState } from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";

export const GroupByFilter = ({
  accessor,
  columnName,
  selectType,
  groups,
  headerFilterManager,
  handleResetGridState,
}) => {
  const isSingle = selectType === "single" ? true : false;
  const [value, setValue] = useState<any | any[] | null>(null);
  const [clearAllSelected, setClearAllSelected] = useState(false);
  useEffect(() => {
    if (
      (Array.isArray(value) && value.length > 0) ||
      (!Array.isArray(value) && Boolean(value))
    ) {
      headerFilterManager.addHeaderFilter(accessor, {
        accessor,
        condition: isSingle ? "equal" : "in",
        value,
      });
      handleResetGridState();
    } else {
      headerFilterManager.removeHeaderFilter(accessor);
      handleResetGridState();
    }
  }, [value]);
  if (!Array.isArray(groups)) {
    return null;
  }
  const buttons = groups.map((one) => {
    return (
      <ToggleButton key={one.value} value={one.value}>
        {one.label} ({one.count})
      </ToggleButton>
    );
  });
  return (
    <Fragment>
      <Typography style={{ display: "inline-flex" }}>{columnName}</Typography>
      <ToggleButtonGroup
        size="small"
        value={value}
        onChange={(event, value) => {
          setValue(value);
          setClearAllSelected(false);
        }}
        exclusive={isSingle ? true : false}
      >
        {buttons}
        {isSingle ? (
          <ToggleButton key={`${accessor}-all-single`} value={""}>
            Clear
          </ToggleButton>
        ) : (
          <ToggleButton
            selected={clearAllSelected}
            key={`${accessor}-all-multiple`}
            onClick={(e) => {
              e.preventDefault();
              setValue([]);
              setClearAllSelected(true);
            }}
            value=""
          >
            Clear
          </ToggleButton>
        )}
      </ToggleButtonGroup>
    </Fragment>
  );
};
