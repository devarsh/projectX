export const calculateTotalObligation = (dependentFields) => {
  const obligation = Number(dependentFields?.obligation?.value ?? 0);
  const otherObligation = Number(dependentFields?.otherObligation?.value ?? 0);
  const total = obligation + otherObligation;
  return total * 12;
};
