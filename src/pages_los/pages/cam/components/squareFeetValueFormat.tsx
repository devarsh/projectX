export const SquareFeetFormat = ({ value }: any) => {
  let commaSeperate = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });
  if (value !== undefined) {
    return commaSeperate.format(Number(value));
  } else {
    return null;
  }
};
