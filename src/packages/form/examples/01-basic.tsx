import { Fragment } from "react";
import { RecoilRoot } from "recoil";
import {
  TextField,
  Checkbox,
  CheckboxGroup,
  Radio,
  Select,
  DatePicker,
} from "components/common";

import { useForm } from "packages/form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormContext } from "packages/form";

const App = () => {
  return (
    <RecoilRoot>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormContext.Provider
          value={{
            formName: "form1",
            resetFieldOnUnmount: true,
            validationRun: "onBlur",
            initialValues: {
              firstName: "deva@gmail.com",
              password: "dsfdssddfgdfs",
              contact: [
                { tel: 34353445, tag: 12 },
                { tel: 3335, tag: 13 },
              ],
            },
            validationSchema: yup.object().shape({
              email: yup
                .string()
                .required("required field")
                .email("should be valid email"),
            }),
          }}
        >
          <MainApp />
        </FormContext.Provider>
      </MuiPickersUtilsProvider>
    </RecoilRoot>
  );
};

const MainApp = () => {
  const onSubmitHandler = (values, submitEnd, setFieldsError) => {
    setTimeout(() => {
      console.log(values);
      submitEnd(false, "Invalid request");
      setFieldsError({ firstName: "errr email taken" });
    }, 3000);
  };

  const { handleSubmit, handleReset, handleClear } = useForm({
    onSubmit: onSubmitHandler,
  });
  const girdConfig: { xs: any; md: any; sm: any } = { xs: 12, md: 3, sm: 3 };

  return (
    <Fragment>
      <Grid container={true} spacing={3}>
        <TextField
          name="email"
          fieldKey="email"
          type="email"
          variant="outlined"
          margin="normal"
          required
          label="Email Address"
          autoComplete="username email"
          validate={async (data) => {
            return data.value === "devarsh@gmail.com" ? "" : "invalid email";
          }}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <TextField
          name="amount"
          fieldKey="amount"
          type="number"
          variant="outlined"
          margin="normal"
          required
          label="Amount"
          enableNumWords={true}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Checkbox
          name="rememberMe"
          fieldKey="rememberMe"
          label="I have read all the terms and conditions"
          enableGrid={true}
          GridProps={girdConfig}
        />
        <CheckboxGroup
          fieldKey="food"
          name="food"
          label="pick everything you want"
          options={[
            { label: "ice-cream", value: "ic" },
            { label: "oreo", value: "o" },
            { label: "laze", value: "l" },
          ]}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Radio
          name="marriageStatus"
          fieldKey="marriageStatus"
          label="Marriage Status"
          options={[
            { label: "Married", value: "m" },
            { label: "UnMarried", value: "u" },
          ]}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Radio
          name="kidsStatus"
          fieldKey="kidsStatus"
          label="Kids Status"
          options={[
            { label: "have kids", value: "h" },
            { label: "no kids", value: "n" },
          ]}
          enableGrid={true}
          GridProps={girdConfig}
          dependentFields={["marriageStatus"]}
          shouldExclude={(_, dependentValues) => {
            if (dependentValues?.marriageStatus?.value === "m") {
              return false;
            }
            return true;
          }}
        />
        <DatePicker
          name="dob"
          fieldKey="dob"
          label="Date Of Birth"
          placeholder="dd/mm/yyyy"
          format="dd/MM/yyyy"
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Select
          fieldKey="country"
          name="country"
          label="country"
          options={() => {
            return new Promise((res, rej) => {
              setTimeout(() => {
                res([
                  { label: "India", value: 1 },
                  { label: "Usa", value: 2 },
                  { label: "Canada", value: 3 },
                ]);
              }, 5000);
            });
          }}
          enableGrid={true}
          GridProps={girdConfig}
        />
        <Select
          name="state"
          fieldKey="state"
          label="State"
          autoWidth={true}
          enableGrid={true}
          GridProps={girdConfig}
          dependentFields={["country"]}
          options={(dependentValues) => {
            return new Promise((res) => {
              setTimeout(() => {
                let value = dependentValues?.country?.value;
                value = Boolean(value) ? value : undefined;
                if (value === 1) {
                  res([
                    { label: "Gujarat", value: 1 },
                    { label: "Maharashtra", value: 2 },
                    { label: "Rajasthan", value: 3 },
                  ]);
                } else if (value === 2) {
                  res([
                    { label: "California", value: 1 },
                    { label: "Texas", value: 2 },
                    { label: "Florida", value: 3 },
                  ]);
                } else if (value === 3) {
                  res([
                    { label: "Ontario", value: 1 },
                    { label: "Alberta", value: 2 },
                    { label: "Ottawa", value: 3 },
                  ]);
                } else {
                  res([{ label: "unknown", value: undefined }]);
                }
              }, 3000);
            });
          }}
        />
      </Grid>
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit Full
      </Button>
      <Button
        component="button"
        variant="contained"
        color="primary"
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button variant="contained" color="primary" onClick={handleClear}>
        Clear
      </Button>
    </Fragment>
  );
};

export default App;

/*
<ArrayField
        arrayFieldName="contact"
        template={{ tel: "", tag: "" }}
        renderRowsFn={(props) => {
          const { row, removeFn, fields, rowIndex } = props;
          const oneRow = fields.map((field) => {
            return (
              <TextField
                name={row.cells[field].name}
                fieldKey={row.cells[field].key}
                key={row.cells[field].key}
                type="text"
                variant="outlined"
                margin="normal"
                label={field}
                validate={yupValidationHelper(
                  yup.string().required("this is required field")
                )}
                enableGrid={false}
              />
            );
          });
          return (
            <div key={row.fieldIndexKey}>
              {oneRow}
              <button onClick={() => removeFn(rowIndex)}>Remove Key</button>
            </div>
          );
        }}
        renderParentFn={({ rows, key, push }) => {
          return (
            <div key={key}>
              <button onClick={() => push()}>Add</button>
              {rows}
            </div>
          );
        }}
      />
<ArrayField
        arrayFieldName="address"
        template={{ street1: "", city: "", state: "" }}
        renderRowsFn={(props) => {
          const { row, removeFn, fields, rowIndex } = props;
          const oneRow = fields.map((field) => {
            return (
              <TextField
                name={row.cells[field].name}
                fieldKey={row.cells[field].key}
                key={row.cells[field].key}
                type="text"
                variant="outlined"
                margin="normal"
                label={field}
                validate={yupValidationHelper(
                  yup.string().required("this is required field")
                )}
                enableGrid={false}
              />
            );
          });
          return (
            <div key={row.fieldIndexKey}>
              {oneRow}
              <button onClick={() => removeFn(rowIndex)}>Remove Key</button>
            </div>
          );
        }}
        renderParentFn={({ rows, key, push }) => {
          return (
            <div key={key}>
              <button onClick={() => push()}>Add</button>
              {rows}
            </div>
          );
        }}
      />
*/
