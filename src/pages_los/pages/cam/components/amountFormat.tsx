import { Default } from "./default";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

let numberFormatter = new Intl.NumberFormat("en-IN", {});

export const Amount = ({
  value,
  skipSymbol = false,
  align = "right",
  ...others
}: any) => {
  let currentFormat = Boolean(skipSymbol) ? numberFormatter : currencyFormatter;
  let result = "-";
  if (value !== null && value !== "" && !isNaN(Number(value))) {
    result = currentFormat.format(value);
  }
  return <Default value={result} {...others} align={align} />;
};
