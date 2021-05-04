import { PV, PMT } from "./utils";

export const calculateFOIR = (dependentFields) => {
  const totalIncome = Number(dependentFields?.totalIncome?.value);
  if (totalIncome < 20000) {
    return 60;
  } else if (totalIncome > 100000) {
    return 70;
  } else {
    return 65;
  }
};

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

export const setEligibleLoanAmount = (dependentFields) => {
  return Number(dependentFields?.loanAmountBasedOnFOIRLTV?.value);
};

export const balanceLeasePeriodRemaining = (dependentFields) => {
  const totalMonthLeasePeriod = dependentFields?.totalMonthLeasePeriod?.value;
  const momnthPassed = dependentFields?.momnthPassed?.value * 30;
  return totalMonthLeasePeriod - momnthPassed;
};

export const rentRevisionMonths = (dependentFields) => {
  const momnthPassed = dependentFields?.momnthPassed?.value;
  const rentReviFrequency = dependentFields?.rentReviFrequency?.value;
  const calculateMod = momnthPassed % rentReviFrequency;
  return rentReviFrequency - calculateMod;
};

export const calculateLTVLRD = (dependentFields) => {
  const propertyType = dependentFields?.propertyType?.value;

  if (propertyType === "01" || propertyType === "02") {
    return 65;
  } else if (propertyType === "03") {
    return 60;
  } else {
    return null;
  }
};

export const loanAmountBasedOnLTVLRD = (dependentFields) => {
  const ltv = Number(dependentFields?.ltv?.value) / 100;
  const propertyValue = Number(dependentFields?.propertyValue?.value);
  return ltv * propertyValue;
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

export const calculateNewLTVCondition = (dependentFields) => {
  const propertyMarketValue = Number(
    dependentFields?.propertyMarketValue?.value
  );
  if (propertyMarketValue >= 0 && propertyMarketValue <= 3000000) {
    return 90;
  } else if (propertyMarketValue > 3000000 && propertyMarketValue <= 7500000) {
    return 80;
  } else {
    return 75;
  }
};

export const calculateSENPCLFR = (dependentFields) => {
  const ltv = Number(dependentFields?.newltv?.value);
  const foir = Number(dependentFields?.foir?.value);
  return ltv + foir;
};

export const calcualteSENPEligibleEMI = (dependentFields) => {
  const totalIncome = Number(dependentFields?.totalIncome?.value);
  const foir = Number(dependentFields?.foir?.value);
  const totalObligations = Number(
    dependentFields?.totalActualObligations?.value
  );
  const result = totalIncome * (foir / 100);
  return result - totalObligations;
};

export const calculateSENPCondition = (dependentFields) => {
  const newltvcondition = Number(dependentFields?.newltvCondition?.value);
  const newltv = Number(dependentFields?.newltv?.value);
  const clfr = Number(dependentFields?.clfr?.value);
  if (newltv <= newltvcondition && clfr <= 145) {
    return "Fine";
  } else {
    return "Revise FOIR";
  }
};

export const calculateSENPLoanAmountBasedOnFOIRCondition = (
  dependentFields
) => {
  const condition = dependentFields?.condition?.value?.toLowerCase();
  const loanAmount = Number(dependentFields?.loanAmountBasedOnFOIR?.value);
  if (condition === "fine") {
    return loanAmount;
  } else {
    return 0;
  }
};

export const calculateSENPLoanAmountCondition = (dependentFields) => {
  const propertyMarketValue = Number(
    dependentFields?.propertyMarketValue?.value
  );
  if (propertyMarketValue >= 0 && propertyMarketValue <= 3000000) {
    return "Put LTV Up to 90%";
  } else if (propertyMarketValue > 3000000 && propertyMarketValue <= 7500000) {
    return "Put LTV Up to 80%";
  } else {
    return "Put LTV Up to 75%";
  }
};

export const calculateSENPAmount = (dependentFields) => {
  const propertyMarketValue = Number(
    dependentFields?.propertyMarketValue?.value
  );
  const ltv = Number(dependentFields?.ltv?.value) / 100;
  return propertyMarketValue * ltv;
};

export const calculateSENPNewCLFR = (dependentFields) => {
  const ltv = Number(dependentFields?.ltv?.value);
  const newfoir = Number(dependentFields?.newfoir?.value);
  return ltv + newfoir;
};

export const calculateSENPltvCondition = (dependentFields) => {
  const ltv = Number(dependentFields?.ltv?.value);
  const newltvcondition = Number(dependentFields?.newltvCondition?.value);
  const newclfr = Number(dependentFields?.newclfr?.value);
  if (ltv > newltvcondition && newclfr <= 145) {
    return "Fine";
  } else {
    return "Revise LTV";
  }
};

export const calculateSENPNewLTV = (dependentFields) => {
  const propertyMarketValue = Number(
    dependentFields?.propertyMarketValue?.value
  );
  const loanAmountBasedOnFOIR = Number(
    dependentFields?.loanAmountBasedOnFOIR?.value
  );
  return Math.ceil((loanAmountBasedOnFOIR / propertyMarketValue) * 100);
};

export const calculateSENPNewFOIR = (dependentFields) => {
  const rateValue = Number(dependentFields?.rate?.value) / 100 / 12;
  const tenur = Number(dependentFields?.tenur?.value);
  const amount = Number(dependentFields?.amount?.value) * -1;
  const totalIncome = Number(dependentFields?.totalIncome?.value);
  const totalObligations = Number(
    dependentFields?.totalActualObligations?.value
  );
  const PMTResult = Math.abs(PMT(rateValue, tenur, amount));
  const result = ((PMTResult + totalObligations) / totalIncome) * 100;
  return Math.round(result);
};

export const calculateSENPLoanAmountBasedOnLTV = (dependentFields) => {
  const ltvcondition = dependentFields?.ltvCondition?.value?.toLowerCase();
  const amount = Number(dependentFields?.amount?.value);
  if (ltvcondition === "fine") {
    return amount;
  } else {
    return 0;
  }
};

export const calculateSENPEligibleLoanAmount = (dependentFields) => {
  const loanAmountBasedOnFOIRCondition = Number(
    dependentFields?.loanAmountBasedOnFOIRCondition?.value
  );
  const loanAmountBasedOnLTV = Number(
    dependentFields?.loanAmountBasedOnLTV?.value
  );
  const result = Math.max(loanAmountBasedOnFOIRCondition, loanAmountBasedOnLTV);
  return Math.round(result);
};

export const calculateBalanceLeasePeriodRemaining = (dependentFields) => {
  const totalMonthLeasePeriod = Number(
    dependentFields?.totalMonthLeasePeriod?.value
  );
  const momnthPassed = Number(dependentFields?.momnthPassed?.value);
  const result = totalMonthLeasePeriod - momnthPassed;
  if (result < 0) {
    return 0;
  }
  return result;
};

export const calculateRentRevisionMonth = (dependentFields) => {
  const rentReviFrequency = Number(dependentFields?.rentReviFrequency?.value);
  const momnthPassed = Number(dependentFields?.momnthPassed?.value);
  const result = momnthPassed % rentReviFrequency;
  return rentReviFrequency - result;
};

export const calculateLoanAmountBasedOnRent = (dependentFields) => {
  const discountpercentage = Number(dependentFields?.newltv?.value) / 100;
  const balanceLeasePeriod = Number(
    dependentFields?.balanceLeasePeriodRem?.value
  );
  const rent = Number(dependentFields?.rent?.value);
  const rate = Number(dependentFields?.rate?.value) / 100;
  const increaseRent = Number(dependentFields?.increaseRent?.value) / 100;
  const incrementFactor = 1 + increaseRent;
  const rentReviFrequency = Number(dependentFields?.rentReviFrequency?.value);
  const rentReviMonth = Number(dependentFields?.rentReviMonth?.value);
  const TDSRate = 1 - Number(dependentFields?.newclfr?.value) / 100;
  let frequencyRevision: any = [];
  let calRentRevisionMonth = rentReviMonth;
  frequencyRevision.push(calRentRevisionMonth);
  if (
    balanceLeasePeriod <= 0 ||
    rent <= 0 ||
    rentReviFrequency <= 0 ||
    rentReviMonth <= 0 ||
    TDSRate <= 0
  ) {
    return 0;
  }
  for (var i = 2; i <= balanceLeasePeriod; i++) {
    calRentRevisionMonth = rentReviFrequency + calRentRevisionMonth;
    if (calRentRevisionMonth > balanceLeasePeriod) {
      break;
    }
    frequencyRevision.push(calRentRevisionMonth);
  }
  let calBalanceForRent = rent; //Rent for Balance Period
  let calDiscounting; //Discounting Persentage
  let calAmountAfterTDS; // Amount after TDS
  let calculateAmount = 0; // Amount
  //let calculateDiscountedEMI = 0; //Discounted EMI
  let calculatePrinicipal = 0; // Sum of the Amount = Principal
  for (var NoOfMonths = 1; NoOfMonths <= balanceLeasePeriod; NoOfMonths++) {
    if (frequencyRevision.includes(NoOfMonths)) {
      calBalanceForRent = calBalanceForRent * incrementFactor;
    }
    calDiscounting = Number(1 / Math.pow(1 + rate / 12, NoOfMonths));
    calAmountAfterTDS = Math.round(calBalanceForRent * TDSRate);
    calculateAmount = Math.round(calAmountAfterTDS * calDiscounting);
    calculatePrinicipal = calculatePrinicipal + calculateAmount;
    //calculateDiscountedEMI = Math.round(calculateAmount * calDiscounting);
  }
  console.log("calculatePrinicipal", calculatePrinicipal);
  let calculateEligibleAmount = 0;
  if (calculatePrinicipal > 0) {
    calculateEligibleAmount = Math.round(
      discountpercentage * calculatePrinicipal
    );
  }
  return calculateEligibleAmount;
};

export const calculateMinimumLoanAmountBasedOnLTVRent = (dependentFields) => {
  const loanAmountBasedOnLTV = Number(
    dependentFields?.loanAmountBasedOnLTV?.value
  );
  const eligibleAmountBasedOnRent = Number(
    dependentFields?.eligibleAmountBasedOnRent?.value
  );
  return Math.round(Math.min(loanAmountBasedOnLTV, eligibleAmountBasedOnRent));
};

export const calculateLRDEligibleEMI = (dependentFields) => {
  const rateValue = Number(dependentFields?.rate?.value) / 100 / 12;
  const balanceLeasePeriodRem = Number(
    dependentFields?.balanceLeasePeriodRem?.value
  );
  const minimunLoanLTVRent =
    Number(dependentFields?.minimunLoanLTVRent?.value) * -1;
  return Math.round(
    Math.abs(PMT(rateValue, balanceLeasePeriodRem, minimunLoanLTVRent))
  );
};

export const calculateLRDEligibleLoanAmount = (dependentFields) => {
  return Number(dependentFields?.minimunLoanLTVRent?.value);
};
