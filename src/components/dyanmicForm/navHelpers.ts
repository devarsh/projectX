export const displayOTPPage = (navigationState) => {
  if (`${navigationState.empCode ?? ""}` === "98") {
    return true;
  }
  return false;
};

export const constructNavigationStateFromRespObj = (responseObj) => {
  return {
    prodCode: responseObj?.data?.productType ?? null,
    empCode: responseObj?.data?.employementStatus ?? null,
    tranCode: responseObj?.data?.refID ?? null,
  };
};

export const shouldContinueToQuestionnaireForm = (navigationState) => {
  console.log(navigationState);
  if (
    typeof navigationState === "object" &&
    Boolean(navigationState?.prodCode ?? null) &&
    Boolean(navigationState?.empCode ?? null)
  ) {
    return true;
  }
  return false;
};

export const constructNavigationUrlForQuestionnaire = (navigationState) => {
  return `${navigationState.prodCode ?? ""}-${navigationState.empCode ?? ""}`;
};
