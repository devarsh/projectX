import { Default } from "./default";

export const Percentage = ({ value, ...others }: any) => {
  let result = "-";
  if (!isNaN(Number(value))) {
    result = `${value}%`;
  }
  return <Default value={result} {...others} />;
};
