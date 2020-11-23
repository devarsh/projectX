import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface WrapperStyleProps {
  root: BaseCSSProperties;
}

export type WrapperStyleNamesProps = Record<keyof WrapperStyleProps, string>;

export const wrapperStyles = (theme: Theme): any => ({
  root: {
    display: "flex",
  },
});
