import { useState, useRef } from "react";

export const combineAndRunValidation = (schemaValidation, validation) => async (
  value
) => {
  let result;
  if (typeof schemaValidation === "function") {
    result = await schemaValidation(value);
    if (Boolean(result)) {
      return result;
    }
  }
  if (typeof validation === "function") {
    result = await validation(value);
    if (Boolean(result)) {
      return result;
    }
  }
  return "";
};
