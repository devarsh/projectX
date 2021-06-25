import { createContext, FC } from "react";
import * as API from "./api";

export interface BankMasterAPIProviderType {
  context: any;
  getBankFormData: CRUDFNType;
  updateBankFormData: CRUDFNType;
  deleteBankFormData: CRUDFNType;
}

export const BankMasterAPIContext = createContext<BankMasterAPIProviderType>(
  {} as BankMasterAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const BankMasterAPIProvider: FC<BankMasterAPIProviderType> = ({
  children,
  context,
  getBankFormData,
  updateBankFormData,
  deleteBankFormData,
}) => {
  return (
    <BankMasterAPIContext.Provider
      value={{
        context,
        getBankFormData,
        updateBankFormData,
        deleteBankFormData,
      }}
    >
      {children}
    </BankMasterAPIContext.Provider>
  );
};

export const generateBankMasterAPIContext = ({ moduleType }) => {
  return {
    context: { moduleType },
    getBankFormData: {
      fn: API.getFormData,
      args: { moduleType },
    },
    updateBankFormData: {
      fn: API.updateBankData,
      args: { moduleType },
    },
    deleteBankFormData: {
      fn: API.deleteBankData,
      args: { moduleType },
    },
  };
};
