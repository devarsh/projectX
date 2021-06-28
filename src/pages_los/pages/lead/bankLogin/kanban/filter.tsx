import { splitTask } from "./utils";

export const Filter = ({
  data,
  children,
  filterValue,
  columns,
  filterBy = [],
  splitItemsBy,
  itemsPriorityKey,
}) => {
  if (typeof children === "function") {
    let newData = filterData(data, filterBy, filterValue);
    let result = splitTask(newData, columns, splitItemsBy, itemsPriorityKey);
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
