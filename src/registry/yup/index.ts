import { addMethod, string, StringSchema } from "yup";

function isValidPanCard(this: StringSchema, message: string) {
  return this.matches(/^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/, message);
}

addMethod(string, "pancard", isValidPanCard);

function isValidAadharCard(this: StringSchema, message: string) {
  return this.matches(/^\d{4}\d{4}\d{4}$/, message);
}

addMethod(string, "aadhar", isValidAadharCard);

// function isValidAge(this: StringSchema, message: string) {
//   console.log("valid date");
//   // return sub(new Date(), { years: 18 });
// }
// addMethod(string, "isValidAge", isValidAge);
