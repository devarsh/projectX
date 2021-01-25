import { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { EditForm } from "./formEdit";
import { ViewForm } from "./formView";

export const CRUD = ({
  refID,
  productType,
  setDisableDialogClose,
  isProductEditedRef,
}) => {
  const [currentView, setCurrentView] = useState("viewMode");
  const [userMessage, setUserMessage] = useState<any>(null);

  useEffect(() => {
    if (userMessage !== null) {
      setTimeout(() => setUserMessage(null), 2000);
    }
  }, [userMessage, setUserMessage]);

  const moveToEditForm = () => {
    setCurrentView("editMode");
    setDisableDialogClose(true);
  };
  const moveToViewForm = () => {
    setCurrentView("viewMode");
    setDisableDialogClose(false);
  };

  return (
    <>
      {userMessage !== null && (
        <Alert severity={userMessage.type}>{userMessage?.message}</Alert>
      )}
      {currentView === "viewMode" ? (
        <ViewForm
          refID={refID}
          productType={productType}
          moveToEditForm={moveToEditForm}
        />
      ) : (
        <EditForm
          refID={refID}
          productType={productType}
          moveToViewForm={moveToViewForm}
          setUserMessage={setUserMessage}
          isProductEditedRef={isProductEditedRef}
        />
      )}
    </>
  );
};
