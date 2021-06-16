import { Default } from "./default";
import { useContext } from "react";
import { AmountContext } from "../context";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
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
  let ctx = useContext(AmountContext);
  let result = "-";
  let currentFormat = Boolean(skipSymbol) ? numberFormatter : currencyFormatter;
  if (value !== null && value !== "" && !isNaN(Number(value))) {
    result = `${currentFormat.format(value / ctx?.amountIn ?? 1)}`;
  }
  return <Default value={result} {...others} align={align} />;
};
