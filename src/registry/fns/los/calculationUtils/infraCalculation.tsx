export const calculateTotalObligation = (dependentFields) => {
  const obligation = Number(dependentFields?.obligations?.value ?? 0);
  const otherObligation = Number(dependentFields?.otherObligations?.value ?? 0);
  const total = obligation + otherObligation;
  return total;
};
