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
  let result = "-";
  let currentFormat = Boolean(skipSymbol) ? numberFormatter : currencyFormatter;
  if (value !== null && value !== "" && !isNaN(Number(value))) {
    result = `${currentFormat.format(value / 100000)}`;
  }
  return <Default value={result} {...others} align={align} />;
};
