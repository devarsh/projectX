import { createContext, FC } from "react";

export interface AssignTaskAPIProviderType {
  context: any;
}

export const AssignTaskAPIContext = createContext<AssignTaskAPIProviderType>(
  {} as AssignTaskAPIProviderType
);

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

export const generateAssignTaskAPIContext = ({ moduleType }) => {
  return {
    context: { moduleType },
  };
};
