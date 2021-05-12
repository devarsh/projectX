export const DateFormat = ({ value }: any) => {
  let date = new Date(value);
  //@ts-ignore
  if (isNaN(date)) {
    return value;
  } else {
    let formatter = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formatter.format(date);
  }
};
