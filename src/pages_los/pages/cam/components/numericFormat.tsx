import { Default } from "./default";

let numberFormatter = new Intl.NumberFormat("en-IN", {});

export const Numeric = ({ value, align = "left", ...others }: any) => {
  let result = "-";
  if (value !== null && value !== "" && !isNaN(Number(value))) {
    result = numberFormatter.format(value);
  }
  return <Default value={result} {...others} align={align} />;
};
