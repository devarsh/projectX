import * as yup from "yup";
import { FieldMetaDataType } from "../types";

//construct Yup schema from metaData

export const constructYupSchema = (fields: FieldMetaDataType[]) => {
  if (!Array.isArray(fields)) {
    return yup.object().shape({});
  }
  let schema = {};
  const schemaObject = fields.reduce(parseSchema, schema);
  const yupScheamObject = yup.object().shape(schemaObject);
  return yupScheamObject;
};

const parseSchema = (schema, fieldObj: FieldMetaDataType) => {
  const { name, schemaValidation } = fieldObj;
  if (schemaValidation === undefined) {
    return schema;
  }
  const { type, rules } = schemaValidation;
  //check if type exist in yup
  if (!yup[type]) {
    return schema;
  }
  //if fieldType is array pass template object to makeSchemaFromTemplate and attached it to nested array obj
  if (type === "array") {
    /* @ts-ignore */
    const { template = [] } = fieldObj;
    const nestedschema = constructYupSchema(template);
    const arrayOFNestedSchema = yup[type]()["of"](nestedschema);
    schema[name] = arrayOFNestedSchema;
    return schema;
  } else {
    if (!Array.isArray(rules)) {
      return schema;
    }
    let validator = yup[type]();
    rules.forEach((rule) => {
      const { params, name } = rule;
      if (!validator[name]) {
        return;
      }
      validator = validator[name](...params);
    });
    schema[name] = validator;
    return schema;
  }
};
