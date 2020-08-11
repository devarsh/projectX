import * as yup from "yup";

const validationConfig = {
  abortEarly: false,
  strict: true,
};

export const yupSchemaValidator = (schema, values) => {
  try {
    let result = schema.validateSync(values ?? {}, validationConfig);
    return { type: "success", result };
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      let result = e.inner.reduce((prev, curr) => {
        prev[curr.path] = curr.message;
        return prev;
      }, {});
      return { type: "error", result };
    }
    return { type: "failure", result: e.message };
  }
};

export const yupSchemaValidatorSingle = (schema, value) => {
  try {
    let result = schema.validateSync(value ?? null, validationConfig);
    return { status: "success", result };
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      return { type: "error", result: e.errors[0] };
    }
    return { type: "failure", result: e.message };
  }
};
