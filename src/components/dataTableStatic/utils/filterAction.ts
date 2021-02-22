export const filterAction = (
  actions: any[],
  selectedFlatRows: any,
  singleAction?: boolean
) => {
  if (
    !Array.isArray(actions) ||
    actions.length <= 0 ||
    selectedFlatRows.length <= 0
  ) {
    return actions;
  }
  let result = actions.filter((one) => {
    if (typeof one?.shouldExclude === "function") {
      if (one.shouldExclude(selectedFlatRows) === true) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  });
  if (singleAction === true) {
    return result[0];
  }
  return result;
};
