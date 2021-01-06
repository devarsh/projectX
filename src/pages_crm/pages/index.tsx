import { Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useStyles } from "./style";
import Home from "./home";
import Login from "./login";
import ThankYouPage from "./thankyou";
import NotFoundPage from "./notFound";
import InquiryForms from "./inquiryForms";
import { BecomePartnerFormWrapper } from "./becomePartner";
import OTPVerificationPage from "./otpVerificationDialog";
import AadharVerification from "./aadharVerification";
import Equifax from "./equifax";
import { InquiryViewFormWrapper } from "./inquiryFormActions/inquiryFormView";
import { InquiryEditFormWrapper } from "./inquiryFormActions/inquiryFormEdit";
import { QuestionnaireViewFormWrapper } from "./questionnaireFormActions/questionnaireFormView";
import { QuestionnaireEditFormWrapper } from "./questionnaireFormActions/questionnaireFormEdit";

const Index = () => {
  const classes = useStyles();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="equifx"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <Equifax />
            </div>
          </Box>
        }
      />
      <Route
        path="equifax"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <Equifax />
            </div>
          </Box>
        }
      />
      <Route
        path="aadhar"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <AadharVerification />
            </div>
          </Box>
        }
      />
      <Route
        path="otp"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <OTPVerificationPage />
          </Box>
        }
      />

      <Route path="thankyou" element={<ThankYouPage />} />
      <Route
        path="form/becomePartner"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <BecomePartnerFormWrapper />
            </div>
          </Box>
        }
      />
      <Route
        path="form/:formName"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <InquiryForms />
            </div>
          </Box>
        }
      />
      <Route
        path="form/inquiryFormView"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <InquiryViewFormWrapper />
            </div>
          </Box>
        }
      />

      <Route
        path="form/inquiryFormEdit"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <InquiryEditFormWrapper />
            </div>
          </Box>
        }
      />

      <Route
        path="form/questionnaireFormView"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <QuestionnaireViewFormWrapper />
            </div>
          </Box>
        }
      />

      <Route
        path="form/questionnaireFormEdit"
        element={
          <Box width={1} display="flex" className={classes.wrapper}>
            <div className={classes.paper}>
              <QuestionnaireEditFormWrapper />
            </div>
          </Box>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Index;
