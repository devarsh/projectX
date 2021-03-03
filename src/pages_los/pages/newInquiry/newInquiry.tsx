import { useEffect, useState } from "react";
import { InquiryFormWrapper } from "./inquiryForm";
import { useLocation } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export const NewInquiry = () => {
  const [currentView, setCurrentView] = useState("inquiry");
  const [successID, setSuccessID] = useState("");
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    setCurrentView("inquiry");
    setSuccessID("");
  }, [state]);

  const onSuccessHandler = (refID) => {
    setSuccessID(refID);
    setCurrentView("success");
  };

  const result =
    currentView === "inquiry" ? (
      <InquiryFormWrapper
        navigationState={state}
        onSuccess={onSuccessHandler}
      />
    ) : (
      <Alert>
        <AlertTitle>Success</AlertTitle>
        Inquiry has been successfully Registered with Inquiry No:
        <b> #{successID}</b>.
      </Alert>
    );

  return result;
};
