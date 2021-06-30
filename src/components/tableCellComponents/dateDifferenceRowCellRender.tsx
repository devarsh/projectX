import { differenceInCalendarDays } from "date-fns";

export const DateDifferenceCalculatorRenderer = (props) => {
  const value = props?.cell?.row?.original ?? "";

  const todaysDate = new Date().getTime();
  const dueDate: any = new Date(value?.due_date).getTime();
  const completionDate: any = new Date(value?.completion_date).getTime();
  let diff: any = new Date(todaysDate - dueDate);
  let result = "-";
  let elapseTime: any;

  if (dueDate !== "" || completionDate === "") {
    elapseTime = differenceInCalendarDays(todaysDate, dueDate);
  } else if (dueDate !== "" || completionDate !== "") {
    elapseTime = differenceInCalendarDays(dueDate, completionDate);
  }

  if (elapseTime > "0") {
    result = `${elapseTime} days over due`;
  } else if (elapseTime < "0") {
    result = `${elapseTime * -1} days left`;
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
        color: elapseTime > 0 ? "red" : elapseTime < 0 ? "green" : "gray",
      }}
    >
      {result}
    </span>
  );
};
