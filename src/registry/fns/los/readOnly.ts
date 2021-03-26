export const priorityHoldDays = (_, dependentValues) => {
  if (dependentValues?.enableHoldDays?.value === "Y") {
    return false;
  } else {
    return true;
  }
};
