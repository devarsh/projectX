import { Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useStyles } from "./style";
import Home from "./home";
import Login from "./login";
import ThankYouPage from "./thankyou";
import NotFoundPage from "./notFound";
import InquiryForms from "./inquiryForms";
import { BecomePartnerFormWrapper } from "./becomePartner";

const Index = () => {
  const classes = useStyles();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
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
      <Route path="thankyou" element={<ThankYouPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Index;
