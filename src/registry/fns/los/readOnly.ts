export const priorityHoldDays = (_, dependentValues) => {
  console.log(dependentValues?.enableHoldDays);
  if (dependentValues?.enableHoldDays?.value === "Y") {
    return false;
  }
  return true;
};
