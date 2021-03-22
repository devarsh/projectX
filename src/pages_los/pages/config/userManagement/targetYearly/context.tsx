import { createContext, FC } from "react";
import * as API from "./api";

interface YearlyTargetCRUDProviderType {
  context: any;
  getYearlyTargetGridData: CRUDFNType;
  getYearlyTargetListingGridMetaData: CRUDFNType;
  deleteYearlyTarget: CRUDFNType;
}

export const YearlyTargetCRUDContext = createContext<YearlyTargetCRUDProviderType>(
  {} as YearlyTargetCRUDProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const YearlyTargetCRUDContextProvider: FC<YearlyTargetCRUDProviderType> = ({
  children,
  getYearlyTargetGridData,
  getYearlyTargetListingGridMetaData,
  deleteYearlyTarget,
  context,
}) => {
  return (
    <YearlyTargetCRUDContext.Provider
      value={{
        getYearlyTargetGridData,
        getYearlyTargetListingGridMetaData,
        deleteYearlyTarget,
        context,
      }}
    >
      {children}
    </YearlyTargetCRUDContext.Provider>
  );
};

export const YearlyTargetAPICrudProviderGenerator = (
  moduleType,
  productType,
  userId
) => ({
  context: {
    moduleType,
    productType,
    userId,
  },
  getYearlyTargetGridData: {
    fn: API.listYearlyTarget,
    args: { moduleType, productType, userId },
  },
  getYearlyTargetListingGridMetaData: {
    fn: API.getYearlyTargetGridMetaData,
    args: { moduleType, productType, userId },
  },
  deleteYearlyTarget: {
    fn: API.deleteYearlyTarget,
    args: { moduleType, productType, userId },
  },
});
