import { differenceInYears } from "date-fns";
import { Default } from "./default";

export const Age = ({ value, ...others }: any) => {
  let today = new Date();
  let birthDate = new Date(value);
  let result: any = Math.abs(differenceInYears(birthDate, today));
  if (isNaN(result)) {
    result = "-";
  }
  return <Default value={result} {...others} />;
};
