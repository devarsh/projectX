import * as yup from "yup";
import { FormFieldAtom } from "packages/form";

const validationConfig = {
  abortEarly: false,
  strict: true,
};

export const yupValidationHelper = (schema: any) => ({
  value,
}: FormFieldAtom) => {
  try {
    schema.validateSync(value ?? null, validationConfig);
    return "";
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      return e.errors[0];
    }
    return e.message;
  }
};
