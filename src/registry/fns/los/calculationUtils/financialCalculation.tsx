export const calculateEBITDA = (dependentFields) => {
  const depreciation = Number(dependentFields?.depreciation?.value);
  const ebit = Number(dependentFields?.ebit?.value);
  if (depreciation && ebit !== null) {
    return ebit + depreciation;
  }
};

export const calculateEBIT = (dependentFields) => {
  const ebt = Number(dependentFields?.ebt?.value);
  const interestExpenses = Number(dependentFields?.interestExpenses?.value);
  if (ebt && interestExpenses !== null) {
    return interestExpenses + ebt;
  }
};

export const calculateEBT = (dependentFields) => {
  const tax = Number(dependentFields?.tax?.value);
  const pat = Number(dependentFields?.pat?.value);
  if (tax && pat !== null) {
    return pat + tax;
  }
};

export const calculateCashProfit = (dependentFields) => {
  const depreciation = Number(dependentFields?.depreciation?.value);
  const pat = Number(dependentFields?.pat?.value);
  if (depreciation && pat !== null) {
    return pat + depreciation;
  }
};

export const calculateEBITDAPercentage = (dependentFields) => {
  const ebitDa = Number(dependentFields?.ebitDa?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  if (ebitDa && revenue !== null) {
    const total = (ebitDa / revenue) * 100;
    // return Math.round(total);
    return total;
  }
};

export const calculateEBTPercentage = (dependentFields) => {
  const ebt = Number(dependentFields?.ebt?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  if (ebt && revenue !== null) {
    const total = (ebt / revenue) * 100;
    // return Math.round(total);
    return total;
  }
};

export const calculatePatPercentage = (dependentFields) => {
  const pat = Number(dependentFields?.pat?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  if (pat && revenue !== null) {
    const total = (pat / revenue) * 100;
    return total;
  }
};

export const calculateCashProfitPercentage = (dependentFields) => {
  const cashProfit = Number(dependentFields?.cashProfit?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  if (cashProfit && revenue !== null) {
    const total = (cashProfit / revenue) * 100;
    return total;
  }
};

export const calculateAdjustedPat = (dependentFields) => {
  const pat = Number(dependentFields?.pat?.value);
  const directorsOrPartnersRemuneration = Number(
    dependentFields?.directorsOrPartnersRemuneration?.value
  );
  const interestOnCapital = Number(dependentFields?.interestOnCapital?.value);
  if (pat && directorsOrPartnersRemuneration && interestOnCapital !== null) {
    return pat + directorsOrPartnersRemuneration + interestOnCapital;
  }
};

export const calculateAdjustedCashProfit = (dependentFields) => {
  const adjustedPat = Number(dependentFields?.adjustedPat?.value);
  const depreciation = Number(dependentFields?.depreciation?.value);
  if (adjustedPat && depreciation !== null) {
    return adjustedPat + depreciation;
  }
};

export const calculateAdjustedPatPercentage = (dependentFields) => {
  const adjustedPat = Number(dependentFields?.adjustedPat?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  if (adjustedPat && revenue !== null) {
    const total = (adjustedPat / revenue) * 100;
    return total;
  }
};

export const calculateAdjustedCashProfitPercentage = (dependentFields) => {
  const adjustedCashProfit = Number(dependentFields?.adjustedCashProfit?.value);
  const revenue = Number(dependentFields?.revenue?.value);
  if (adjustedCashProfit && revenue !== null) {
    const total = (adjustedCashProfit / revenue) * 100;
    return total;
  }
};

export const calculateNetWorth = (dependentFields) => {
  const shareCapital = Number(dependentFields?.shareCapital?.value);
  const reservesSurplus = Number(dependentFields?.reservesSurplus?.value);
  if (shareCapital && reservesSurplus !== null) {
    return shareCapital + reservesSurplus;
  }
};

export const calculateNetWorthQuasi = (dependentFields) => {
  const netWorth = Number(dependentFields?.netWorth?.value);
  const unsecLoanPromoter = Number(dependentFields?.unsecLoanPromoter?.value);
  if (netWorth && unsecLoanPromoter !== null) {
    return netWorth + unsecLoanPromoter;
  }
};

export const calculateLongTermDebtEquity = (dependentFields) => {
  const networthQuasi = Number(dependentFields?.networthQuasi?.value);
  const longTermDebtFund = Number(dependentFields?.longTermDebtFund?.value);
  if (networthQuasi && longTermDebtFund !== null) {
    return longTermDebtFund / networthQuasi;
  }
};

export const calculateTolTnvQuasi = (dependentFields) => {
  const longTermDebtFund = Number(dependentFields?.longTermDebtFund?.value);
  const shortTermDebtFund = Number(dependentFields?.shortTermDebtFund?.value);
  const networthQuasi = Number(dependentFields?.networthQuasi?.value);
  const currentLiabilities = Number(dependentFields?.currentLiabilities?.value);
  if (
    shortTermDebtFund &&
    longTermDebtFund &&
    networthQuasi &&
    currentLiabilities !== null
  ) {
    const total = shortTermDebtFund + longTermDebtFund + currentLiabilities;
    return total / networthQuasi;
  }
};

export const calculateCurrentRatio = (dependentFields) => {
  const currentAssets = Number(dependentFields?.currentAssets?.value);
  const currentLiabilities = Number(dependentFields?.currentLiabilities?.value);
  if (currentAssets && currentLiabilities !== null) {
    return currentAssets / currentLiabilities;
  }
};
