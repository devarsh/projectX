import * as yup from "yup";
import { FormFieldAtomType } from "packages/form";

const validationConfig = {
  abortEarly: false,
  strict: true,
};

export const yupValidationHelper = (schema: any) => (_: string, field: any) => {
  //@ts-ignore
  const { value } = field;

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
