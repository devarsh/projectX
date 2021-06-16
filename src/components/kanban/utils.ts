export const splitTask = (data, accessor, columns, columnAccessor) => {
  const m = new Map();
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    Array.isArray(columns) &&
    columns.length > 0
  ) {
    for (let i = 0; i < data.length; i++) {
      if (m.has(data[i]?.[accessor])) {
        let value = m.get(data[i]?.[accessor]);
        let newVal = [...value, data[i]];
        m.set(data[i]?.[accessor], newVal);
      } else {
        m.set(data[i]?.[accessor], [data[i]]);
      }
    }
    let newColumns = columns.map((one) => {
      let id = one?.[columnAccessor];
      let result = m.get(id);
      if (Array.isArray(result)) {
        return { ...one, items: result };
      } else {
        return { ...one, items: [] };
      }
    });
    m.clear();
    return newColumns;
  }
};
