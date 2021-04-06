import { createContext, FC } from "react";
import * as API from "./api";

interface CRUDFNType {
  fn: any;
  args: any;
}

interface ServerGridProviderType {
  getGridMetaData: CRUDFNType;
  getGridData: CRUDFNType;
  getGridColumnFilterData: CRUDFNType;
}

export const ServerGridContext = createContext<ServerGridProviderType>(
  {} as ServerGridProviderType
);

export const ServerGridContextProvider: FC<ServerGridProviderType> = ({
  children,
  getGridMetaData,
  getGridColumnFilterData,
  getGridData,
}) => {
  return (
    <ServerGridContext.Provider
      value={{ getGridMetaData, getGridColumnFilterData, getGridData }}
    >
      {children}
    </ServerGridContext.Provider>
  );
};

export const serverGridContextGenerator = (gridCode) => ({
  getGridData: { fn: API.getGridData, args: { gridCode } },
  getGridMetaData: { fn: API.getGridMetaData, args: { gridCode } },
  getGridColumnFilterData: {
    fn: API.getGridColumnFilterData,
    args: { gridCode },
  },
});
