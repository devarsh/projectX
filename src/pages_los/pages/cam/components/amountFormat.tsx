let currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumSignificantDigits: 3,
  style: "currency",
  currency: "INR",
});

let numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumSignificantDigits: 3,
});

export const Amount = ({ value, skipSymbol, colspan }: any) => {
  let currentFormat = Boolean(skipSymbol) ? numberFormatter : currencyFormatter;
  let result = "-";
  if (!isNaN(Number(value))) {
    result = currentFormat.format(value);
  }
  if (colspan && !isNaN(Number(colspan))) {
    return <td colSpan={colspan}>{result}</td>;
  } else {
    return result;
  }
};
