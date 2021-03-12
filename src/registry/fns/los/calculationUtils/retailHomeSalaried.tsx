import { PV } from "./utils";

export const eligibleEMI = (dependentFields) => {
  const percentageValue = dependentFields?.foir?.value / 100;
  if (typeof dependentFields === "object") {
    const total =
      Number(dependentFields?.totalIncome?.value) * percentageValue -
      Number(dependentFields?.totalActualObligations?.value);
    return total;
  }
};

export const loanAmountBasedOnFOIR = (dependentFields) => {
  const rateValue = Number(dependentFields?.rate?.value / 100 / 12);
  const tenur = Number(dependentFields?.tenur?.value);
  const emi = Number(dependentFields?.eligibleEMI?.value) * -1;
  const result = PV(rateValue, tenur, emi, 0, 0);
  if (isNaN(result)) {
    return 0;
  }
  return Math.floor(result);
};

export const calculateLTV = (dependentFields) => {
  const ltvValue = Number(dependentFields?.propertyMarketValue?.value);
  if (ltvValue >= 0 && ltvValue <= 3000000) {
    return 90;
  } else if (ltvValue > 3000000 && ltvValue <= 7500000) {
    return 80;
  }
  return 75;
};

export const loanAmountBasedOnLTV = (dependentFields) => {
  const ltvPercentageValue = Number(dependentFields?.ltv?.value) / 100;
  const marketPropertyValue = Number(
    dependentFields?.propertyMarketValue?.value
  );
  if (ltvPercentageValue && marketPropertyValue !== null) {
    const total = ltvPercentageValue * marketPropertyValue;
    return total;
  }
};

export const loanAmountBasedOnFOIRLTV = (dependentFields) => {
  const loanAmountBasedOnFOIR = Number(
    dependentFields?.loanAmountBasedOnFOIR?.value
  );
  const loanAmountBasedOnLTV = Number(
    dependentFields?.loanAmountBasedOnLTV?.value
  );
  const result = Math.min(loanAmountBasedOnFOIR, loanAmountBasedOnLTV);
  return Math.round(result);
};

export const eligibileLoanAmountDifference = (dependentFields) => {
  const loanAmount = Number(dependentFields?.loanAmount?.value);
  const loanAmountBasedOnFOIRLTV = Number(
    dependentFields?.loanAmountBasedOnFOIRLTV?.value
  );

  const differencePercentage =
    (loanAmount - loanAmountBasedOnFOIRLTV) / loanAmount;
  return Math.ceil(differencePercentage * 100);
};

export const setEligibleLoanAmount = (dependentFields) => {
  return Number(dependentFields?.loanAmountBasedOnFOIRLTV?.value);
};
