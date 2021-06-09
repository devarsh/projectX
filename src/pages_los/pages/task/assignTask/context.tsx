import { createContext, FC } from "react";

export interface AssignTaskAPIProviderType {
  context: any;
}

export const AssignTaskAPIContext = createContext<AssignTaskAPIProviderType>(
  {} as AssignTaskAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const AssignTaskAPIProvider: FC<AssignTaskAPIProviderType> = ({
  children,
  context,
}) => {
  return (
    <AssignTaskAPIContext.Provider
      value={{
        context,
      }}
    >
      {children}
    </AssignTaskAPIContext.Provider>
  );
};

export const generateAssignTaskAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
  };
};
