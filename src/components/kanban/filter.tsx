import { columns } from "./data";
import { splitTask } from "./utils";

export const Filter = ({ data, children, filterValue }) => {
  if (typeof children === "function") {
    let newData = filterData(data, ["bank", "branch"], filterValue);
    let result = splitTask(newData, "columnID", columns, "columnID");
    console.log(newData, result);
    return children(result);
  }
  return null;
};

export const filterData = (rows: any, ids: any, filerValue: any) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row[id];
      return rowValue?.toLowerCase()?.includes(filerValue?.toLowerCase());
    });
  });
};
