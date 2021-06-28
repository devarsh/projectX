export const splitTask = (
  data: any = [],
  columns: any = [],
  splitBy: string = "columnID",
  priorityKey: string = "id"
) => {
  const m = new Map();
  if (
    Array.isArray(data) &&
    //data.length > 0 &&
    Array.isArray(columns) &&
    columns.length > 0
  ) {
    for (let i = 0; i < data.length; i++) {
      if (m.has(data[i]?.[splitBy])) {
        let value = m.get(data[i]?.[splitBy]);
        let newVal = [...value, data[i]];
        m.set(data[i]?.[splitBy], newVal);
      } else {
        m.set(data[i]?.[splitBy], [data[i]]);
      }
    }
    let newColumns = columns.map((one) => {
      let id = one?.columnInItem;
      let result = m.get(id);
      if (Array.isArray(result)) {
        result = result.sort((a, b) =>
          a?.[priorityKey] >= b?.[priorityKey] ? 1 : -1
        );
        //result.sort((a, b) => a?.priority >= b?.priority);
        return { ...one, items: result };
      } else {
        return { ...one, items: [] };
      }
    });
    m.clear();
    return newColumns;
  }
};

export const getCorrespondingValue = (
  arrayOfObj,
  key,
  value,
  correspondingKey
) => {
  if (Array.isArray(arrayOfObj)) {
    let result = arrayOfObj.filter((one) => one[key] === value);
    return result[0]?.[correspondingKey] ?? value;
  }
};
