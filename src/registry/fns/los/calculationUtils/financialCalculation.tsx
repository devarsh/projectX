export const calculateEBITDA = (dependentFields) => {
  const depreciation = Number(dependentFields?.depreciation?.value);
  const ebit = Number(dependentFields?.ebit?.value);
  return ebit + depreciation;
};

export const calculateEBIT = (dependentFields) => {
  const ebt = Number(dependentFields?.ebt?.value);
  const interestExpenses = Number(dependentFields?.interestExpenses?.value);
  return interestExpenses + ebt;
};

export const calculateEBT = (dependentFields) => {
  const tax = Number(dependentFields?.tax?.value);
  const pat = Number(dependentFields?.pat?.value);
  return pat + tax;
};

export const calculateCashProfit = (dependentFields) => {
  const depreciation = Number(dependentFields?.depreciation?.value);
  const pat = Number(dependentFields?.pat?.value);
  return pat + depreciation;
};

export const calculateEBITDAPercentage = (dependentFields) => {
  const ebitDa = Number(dependentFields?.ebitDa?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (ebitDa / revenue) * 100;
  return total;
};

export const calculateEBTPercentage = (dependentFields) => {
  const ebt = Number(dependentFields?.ebt?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (ebt / revenue) * 100;
  return total;
};

export const calculatePatPercentage = (dependentFields) => {
  const pat = Number(dependentFields?.pat?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (pat / revenue) * 100;
  return total;
};

export const calculateCashProfitPercentage = (dependentFields) => {
  const cashProfit = Number(dependentFields?.cashProfit?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (cashProfit / revenue) * 100;
  return total;
};

export const calculateAdjustedPat = (dependentFields) => {
  const pat = Number(dependentFields?.pat?.value);
  const directorsOrPartnersRemuneration = Number(
    dependentFields?.directorsOrPartnersRemuneration?.value
  );
  const interestOnCapital = Number(dependentFields?.interestOnCapital?.value);
  return pat + directorsOrPartnersRemuneration + interestOnCapital;
};

export const calculateAdjustedCashProfit = (dependentFields) => {
  const adjustedPat = Number(dependentFields?.adjustedPat?.value);
  const depreciation = Number(dependentFields?.depreciation?.value);
  return adjustedPat + depreciation;
};

export const calculateAdjustedPatPercentage = (dependentFields) => {
  const adjustedPat = Number(dependentFields?.adjustedPat?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (adjustedPat / revenue) * 100;
  return total;
};

export const calculateAdjustedCashProfitPercentage = (dependentFields) => {
  const adjustedCashProfit = Number(dependentFields?.adjustedCashProfit?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  const total = (adjustedCashProfit / revenue) * 100;
  return total;
};

export const calculateNetWorth = (dependentFields) => {
  const shareCapital = Number(dependentFields?.shareCapital?.value);
  const reservesSurplus = Number(dependentFields?.reservesSurplus?.value);
  return shareCapital + reservesSurplus;
};

export const calculateNetWorthQuasi = (dependentFields) => {
  const netWorth = Number(dependentFields?.netWorth?.value);
  const unsecLoanPromoter = Number(dependentFields?.unsecLoanPromoter?.value);
  return netWorth + unsecLoanPromoter;
};

export const calculateLongTermDebtEquity = (dependentFields) => {
  const networthQuasi = Number(dependentFields?.networthQuasi?.value);
  const longTermDebtFund = Number(dependentFields?.longTermDebtFund?.value);

  return Number(longTermDebtFund / networthQuasi).toFixed(2);
};

export const calculateTolTnvQuasi = (dependentFields) => {
  const longTermDebtFund = Number(dependentFields?.longTermDebtFund?.value);
  const shortTermDebtFund = Number(dependentFields?.shortTermDebtFund?.value);
  const networthQuasi = Number(dependentFields?.networthQuasi?.value);
  const currentLiabilities = Number(dependentFields?.currentLiabilities?.value);
  const total = shortTermDebtFund + longTermDebtFund + currentLiabilities;
  return Number(total / networthQuasi).toFixed(2);
};

export const calculateCurrentRatio = (dependentFields) => {
  const currentAssets = Number(dependentFields?.currentAssets?.value);
  const currentLiabilities = Number(dependentFields?.currentLiabilities?.value);
  return Number(currentAssets / currentLiabilities).toFixed(2);
};
