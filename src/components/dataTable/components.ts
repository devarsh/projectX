import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

export const ColumnDivier = withStyles({
  vertical: {
    width: "5px",
  },
})(Divider);

export const TableHeaderText = withStyles({
  root: {
    whiteSpace: "nowrap",
  },
})(Typography);
