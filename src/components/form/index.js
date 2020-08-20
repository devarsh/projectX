import * as React from "react";
import { useForm, yupValidationHelper } from "./core";

import { RecoilRoot } from "recoil";
import { MyTextField, FormFeedback } from "./component";
import Button from "@material-ui/core/Button";
import * as yup from "yup";
//import RecoilizeDebugger from "recoilize";
//import * as nodes from "./core/atoms";

const App = () => {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
};

const MainApp = () => {
  const { handleSubmit } = useForm(
    (values, submitStart, submitEnd, setFieldsError) => {
      submitStart();
      setTimeout(() => {
        console.log(values);
        submitEnd(false, "Invalid request");
        setFieldsError({ firstName: "Errrr email taken!" });
      }, 3000);
    }
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormFeedback />
      <MyTextField
        name="firstName"
        type="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="username email"
        validate={yupValidationHelper(
          yup
            .string()
            .required("email is required")
            .email("should be valid email")
        )}
      />
      <MyTextField
        name="password"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        autoComplete="current-password"
        validate={yupValidationHelper(
          yup.string().required("password is required")
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Sign In
      </Button>
    </form>
  );
};

export default App;
