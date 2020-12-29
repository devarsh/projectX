import { FC } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
  defaultValue: any;
  name: string;
  label: string;
}

const MyValueField: FC<MyGridExtendedProps> = (props) => {
  let { defaultValue, label, enableGrid, GridProps } = props;
  if (typeof defaultValue === "object") {
    defaultValue = defaultValue?.toDateString?.() ?? "Invalid Value";
  }

  let result = (
    <div>
      {label}:{defaultValue}
    </div>
  );
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MyValueField;
