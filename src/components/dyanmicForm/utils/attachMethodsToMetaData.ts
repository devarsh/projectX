import { setIn } from "packages/form";
import { MetaDataType } from "../types";
import { singletonFunctionRegisrationFactoryType } from "./functionRegistry";
import { ruleEngine } from "./jsonRuleEngine";

export type AttachMethodArrayType = [RegExp, Function?];

export type AccumulatorType = [string, string, string | number, Function?];

const optionsMethodNotFound = (fieldKey) => () => {
  console.log(`no method found for options at ${fieldKey}`);
  return [{ label: "Oops error occured", value: "" }];
};
const validateMethodNotFound = (fieldKey) => () => {
  console.log(`no method found for validation at ${fieldKey}`);
  return "";
};
const postValidationSetCrossFieldValuesMethodNotFound = (fieldKey) => () => {
  console.log(
    `no method for postValidationSetCrossFieldValues found at ${fieldKey}`
  );
  return undefined;
};
const isReadOnlyMethodNotFound = (fieldKey) => () => {
  console.log(`no method for isReadOnly found at ${fieldKey}`);
  return false;
};
const shouldExcludeNotFound = (fieldKey) => () => {
  console.log(`no method for shouldExclude found at ${fieldKey}`);
  return false;
};
const inputMaskPrepareNotFound = (fieldKey) => (value) => {
  console.log(`no method for inputMask.prepare found at ${fieldKey}`);
  return value;
};

const defaultBooleanFunction = (value) => () => value;

export const defaultFieldsToAttachMethods: AttachMethodArrayType[] = [
  [/^fields.*.options$/, optionsMethodNotFound],
  [/^fields.*.validate$/, validateMethodNotFound],
  [
    /^fields.*.postValidationSetCrossFieldValues$/,
    postValidationSetCrossFieldValuesMethodNotFound,
  ],
  [/^fields.*.isReadOnly$/, isReadOnlyMethodNotFound],
  [/^fields.*.shouldExclude$/, shouldExcludeNotFound],
  [/^fields.*.MaskProps.prepare$/, inputMaskPrepareNotFound],
];

const patternMatch = (patters: AttachMethodArrayType[], value: string) => {
  for (const currentPattern of patters) {
    if (currentPattern[0] instanceof RegExp) {
      if (currentPattern[0].test(value)) {
        return { found: true, defaultFn: currentPattern[1] };
      }
    }
  }
  return { found: false, defaultFn: undefined };
};

const JSONWalker = (
  currentObj: any,
  interestedValues: AttachMethodArrayType[],
  accumulator: AccumulatorType[],
  currentPath: string = "",
  lastKey: string | number = ""
) => {
  if (typeof currentObj === "object") {
    for (const [key, val] of Object.entries(currentObj)) {
      const path = Boolean(currentPath) ? `${currentPath}.${key}` : `${key}`;
      JSONWalker(val, interestedValues, accumulator, path, key);
    }
  } else if (Array.isArray(currentObj)) {
    currentObj.forEach((value, index) => {
      const path = Boolean(currentPath)
        ? `${currentPath}.${index}`
        : `${index}`;
      JSONWalker(value, interestedValues, accumulator, path, index);
    });
  } else {
    let result = patternMatch(interestedValues, currentPath);
    if (result.found) {
      //attach a function that returns boolean
      if (currentObj === "true")
        accumulator.push([
          currentPath,
          "BOOLEAN_FUNCTION_TO_ATTACH_FOR_BOOLEAN_VALUES",
          lastKey,
          defaultBooleanFunction(true),
        ]);
    } else if (currentObj === "false") {
      accumulator.push([
        currentPath,
        "BOOLEAN_FUNCTION_TO_ATTACH_FOR_BOOLEAN_VALUES",
        lastKey,
        defaultBooleanFunction(false),
      ]);
    } else if (typeof currentObj === "boolean") {
      accumulator.push([
        currentPath,
        "BOOLEAN_FUNCTION_TO_ATTACH_FOR_BOOLEAN_VALUES",
        lastKey,
        defaultBooleanFunction(currentObj),
      ]);
    } else if (typeof currentObj === "object") {
      accumulator.push([
        currentPath,
        "RULES_ENGINE_FUNCTION_TO_ATTACH_AS_DEFAULT_FN",
        lastKey,
        ruleEngine(currentObj),
      ]);
    } else if (typeof currentObj === "string") {
      if (typeof result.defaultFn === "function") {
        let retVal = result.defaultFn(currentPath);
        if (typeof retVal === "function") {
          accumulator.push([currentPath, currentObj, lastKey, retVal]);
        } else {
          accumulator.push([currentPath, currentObj, lastKey, undefined]);
        }
      } else {
        accumulator.push([currentPath, currentObj, lastKey, undefined]);
      }
    }
  }
};

//we will attach default function for each field Key type if we cannot the required function
//array index
//0-the path to set function at
//1-the strign value that will be used as key to find mapped function from functions registry
//2-is the key name
//3-default function for that key - it can be undefined it its not declared
export const attachMethodsToMetaData = (
  metaData: MetaDataType,
  registrationFnInstance: singletonFunctionRegisrationFactoryType,
  interestedFields: AttachMethodArrayType[] = defaultFieldsToAttachMethods
) => {
  const data: AccumulatorType[] = [];
  JSONWalker(metaData, interestedFields, data);
  let newMetaData = { ...metaData };
  for (const one of data) {
    const retVal = registrationFnInstance.getFn(one[1], one[3]);
    newMetaData = setIn(newMetaData, one[0], retVal);
  }
  return newMetaData;
};
