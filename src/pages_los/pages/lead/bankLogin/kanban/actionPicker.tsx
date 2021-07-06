import { BankSelection } from "../bankSelection";

export const ActionPicker = ({
  currentAction,
  closeDialog,
  dataChangedRef,
}) => {
  return currentAction?.name === "addBank" ? (
    <BankSelection
      refID={currentAction?.refID}
      closeDialog={closeDialog}
      isDataChangedRef={dataChangedRef}
    />
  ) : null;
};
