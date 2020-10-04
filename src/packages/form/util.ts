import clone from "lodash/clone";
import toPath from "lodash/toPath";
import * as yup from "yup";

//Copied the following from Formik library

export const isString = (obj: any): obj is string =>
  Object.prototype.toString.call(obj) === "[object String]";

export const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === "object";

export const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

export function getIn(
  obj: any,
  key: string | string[],
  def?: any,
  p: number = 0
) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj === undefined ? def : obj;
}

export function setIn(obj: any, path: string, value: any): any {
  let res: any = clone(obj); // this keeps inheritance when obj is a class
  let resVal: any = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];
    let currentObj: any = getIn(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = clone(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  // If the path array has a single element, the loop did not run.
  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  if (i === 0 && value === undefined) {
    delete res[pathArray[i]];
  }

  return res;
}

const validationConfig = {
  abortEarly: false,
  strict: true,
};

export const yupValidationHelper = (schema: any) => (field: any) => {
  //@ts-ignore
  const { value } = field;

  try {
    console.log(value);
    schema.validateSync(value ?? null, validationConfig);
    return "";
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      return e.errors[0];
    }
    return e.message;
  }
};

export const wrapValidationMethod = (
  schema: yup.ObjectSchema | undefined,
  validationFn: any,
  path: string
) => {
  let fieldSchema;
  if (typeof schema === "object" && schema.validate) {
    try {
      fieldSchema = yup.reach(schema, path);
    } catch (e) {
      fieldSchema = undefined;
    }
  }
  if (fieldSchema !== undefined) {
    const wrapperFunction = (field: any) => {
      let result = yupValidationHelper(fieldSchema)(field);
      if (typeof validationFn === "function") {
        if (Boolean(result) === false) {
          return validationFn(field);
        } else {
          return result;
        }
      } else {
        return result;
      }
    };
    return wrapperFunction;
  }
  return validationFn;
};
