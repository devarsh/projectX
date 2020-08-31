import * as React from "react";
import { useForm, yupValidationHelper } from "../core";

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

// interface FieldProps extends TemplateFieldRowValue {
//   index: number;
//   dataKey: string;
// }

// const Field: React.FC<FieldProps> = ({ dataKey, name, index }): any => {
//   let renderCount = React.useRef(0);
//   React.useEffect(() => {
//     console.log("mounted:", dataKey);
//     return () => console.log("unmounted:", dataKey);
//   }, []);
//   console.log("render count---", dataKey, ":", renderCount.current++);
//   return (
//     <div>
//       {dataKey} / {name} / {index}
//     </div>
//   );
// };

// const FormMain: React.FC = () => {
//   const { renderRows, push, remove } = useFieldArray({
//     arrayFieldName: "demo",
//     template: { name: "", surname: "", age: "" },
//   });
//   const rows = renderRows((row, fields, index) => {
//     let result = fields.map((field) => {
//       return (
//         <Field
//           dataKey={row.values[field].key}
//           key={row.values[field].key}
//           name={row.values[field].name}
//           index={index}
//         />
//       );
//     });
//     return (
//       <div key={row.fieldKey}>
//         {result}
//         <button onClick={() => remove(index)}>Delete</button>
//       </div>
//     );
//   });
//   return (
//     <div>
//       <button onClick={() => push()}>push</button>
//       <br />
//       <div key="content">{rows}</div>
//     </div>
//   );
// };

// export default FormMain;
