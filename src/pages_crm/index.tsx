import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Box from "@material-ui/core/Box";
import { Theme, makeStyles } from "@material-ui/core/styles";
import ThankYouPage from "./thankyou";
import NotFoundPage from "./notFound";
import Header from "./header";
import Footer from "./footer";
import Home from "./home";
import DynamicForm from "components/dyanmicForm";
import { LoginForm } from "./dashboardLogin/login";

import {
  WrapperStyleProps,
  WrapperStyleNamesProps,
  wrapperStyles,
} from "./style";

const useStyles = makeStyles<Theme, WrapperStyleProps>(wrapperStyles);

const Index = () => {
  const classes: WrapperStyleNamesProps = useStyles({} as WrapperStyleProps);
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="thankyou" element={<ThankYouPage />} />
        <Route
          path="form/:formName"
          element={
            <Box width={1} display="flex" className={classes.wrapper}>
              <DynamicForm />
            </Box>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default Index;
