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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Index;
