export const Amount = ({ value }: any) => {
  let formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "INR",
  });
  if (value !== undefined) {
    return formatter.format(Number(value));
  } else {
    return null;
  }
};
