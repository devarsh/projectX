import { setIn } from "packages/form";
import { MetaDataType } from "../types";
import { singletonFunctionRegisrationFactoryType } from "./functionRegistry";

export const defaultInterestedFields = [
  /^fields.*.options$/,
  /^fields.*.validate$/,
  /^fields.*.postValidationSetCrossFieldValues$/,
  /^fields.*.isReadyOnly$/,
  /^fields.*.shouldExclude$/,
  /^fields.*.MaskProps.prepare$/,
];

const patternMatch = (patters: Object[], value: string) => {
  for (const currentPattern of patters) {
    if (currentPattern instanceof RegExp) {
      if (currentPattern.test(value)) {
        return true;
      }
    }
  }
  return false;
};

const JSONWalker = (
  currentObj: any,
  interestedValues: RegExp[] = [],
  accumulator: Object[],
  callback: any = undefined,
  currentPath: string = "",
  lastKey: string | number = ""
) => {
  if (typeof currentObj === "object") {
    for (const [key, val] of Object.entries(currentObj)) {
      const path = Boolean(currentPath) ? `${currentPath}.${key}` : `${key}`;
      JSONWalker(val, interestedValues, accumulator, callback, path, key);
    }
  } else if (Array.isArray(currentObj)) {
    currentObj.forEach((value, index) => {
      const path = Boolean(currentPath)
        ? `${currentPath}.${index}`
        : `${index}`;
      JSONWalker(value, interestedValues, accumulator, callback, path, index);
    });
  } else {
    if (patternMatch(interestedValues, currentPath)) {
      if (typeof currentObj === "string") {
        if (callback !== undefined && typeof callback === "function") {
          callback(currentPath, currentObj, lastKey);
        }
        accumulator.push([currentPath, currentObj, lastKey]);
      }
    }
  }
};

export const attachMethodsToMetaData = (
  metaData: MetaDataType,
  registrationFnInstance: singletonFunctionRegisrationFactoryType,
  interestedFields: RegExp[] = defaultInterestedFields
) => {
  const data = [];
  JSONWalker(metaData, interestedFields, data);
  let newMetaData = metaData;
  for (const one of data) {
    const retVal = registrationFnInstance.getFn(one[1], undefined);
    newMetaData = setIn(newMetaData, one[0], retVal);
  }
  return newMetaData;
};
