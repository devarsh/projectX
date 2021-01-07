import { addMethod, string, StringSchema, DateSchema } from "yup";

function isValidPanCard(this: StringSchema, message: string) {
  return this.matches(/^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/, message);
}

addMethod(string, "pancard", isValidPanCard);

function isValidAadharCard(this: StringSchema, message: string) {
  return this.matches(/^\d{4}\d{4}\d{4}$/, message);
}

addMethod(string, "aadhar", isValidAadharCard);
