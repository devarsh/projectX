import { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { InquiryEditFormWrapper } from "./formEdit";
import { InquiryViewFormWrapper } from "./formView";

export const ViewEditCompositeComponent = ({
  inquiryID,
  inquiryType,
  setDisableDialogClose,
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
        <InquiryViewFormWrapper
          inquiryID={inquiryID}
          inquiryType={inquiryType}
          moveToEditForm={moveToEditForm}
        />
      ) : (
        <InquiryEditFormWrapper
          inquiryID={inquiryID}
          inquiryType={inquiryType}
          moveToViewForm={moveToViewForm}
          setUserMessage={setUserMessage}
        />
      )}
    </>
  );
};
