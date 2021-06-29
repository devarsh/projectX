import { differenceInCalendarDays } from "date-fns";

export const DateDifferenceCalculatorRenderer = (props) => {
  const value = props?.cell?.row?.original ?? "";

  const todaysDate = new Date().getTime();
  const dueDate = new Date(value?.due_date).getTime();
  const completionDate = new Date(value?.completion_date);

  let elapseTime1: any = differenceInCalendarDays(todaysDate, completionDate);
  console.log(elapseTime1);

  let diff: any = new Date(todaysDate - dueDate);
  let result = "-";
  if (value?.status === "Completed") {
    return result;
  } else {
  }

  let elapseTime: any = differenceInCalendarDays(todaysDate, dueDate);

  if (elapseTime > "0") {
    return (result = `${elapseTime} days ago`);
  } else if (elapseTime < "0") {
    return (result = `${elapseTime * -1} days left`);
  } else if (elapseTime === "0") {
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    result = `${hh + ":" + mm} mins`;
  }
  return (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {result}
    </span>
  );
};
