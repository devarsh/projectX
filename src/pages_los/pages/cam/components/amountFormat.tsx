import { Default } from "./default";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumSignificantDigits: 3,
  style: "currency",
  currency: "INR",
});

let numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumSignificantDigits: 3,
});

export const Amount = ({
  value,
  skipSymbol = false,
  align = "right",
  ...others
}: any) => {
  let currentFormat = Boolean(skipSymbol) ? numberFormatter : currencyFormatter;
  let result = "-";
  if (!isNaN(Number(value))) {
    result = currentFormat.format(value);
  }
  return <Default value={result} {...others} align={align} />;
};
