export const calculateTotalObligation = (dependentFields) => {
  const obligation = Number(dependentFields?.obligation?.value);
  const otherObligation = Number(dependentFields?.otherObligation?.value);
  if (obligation && otherObligation !== null) {
    const total = obligation + otherObligation;
    return total * 12;
  }
};
