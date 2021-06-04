import { Default } from "./default";

let formatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const DateFormat = ({ value, ...others }: any) => {
  let date = new Date(value);
  let result = "-";
  //@ts-ignore
  if (!isNaN(date)) {
    result = formatter.format(date);
  }
  return <Default value={result} {...others} />;
};
