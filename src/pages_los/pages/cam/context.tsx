import { createContext, FC } from "react";

export interface AmountProviderType {
  amountIn: any;
}

export const AmountContext = createContext<AmountProviderType>(
  {} as AmountProviderType
);

export const AmountContextProvider: FC<AmountProviderType> = ({
  children,
  amountIn,
}) => {
  return (
    <AmountContext.Provider
      value={{
        amountIn,
      }}
    >
      {children}
    </AmountContext.Provider>
  );
};
