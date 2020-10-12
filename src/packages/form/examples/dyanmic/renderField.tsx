import { FieldMetaDataType } from "./types";
import {
  TextField,
  Checkbox,
  CheckboxGroup,
  Radio,
  Switch,
  SwitchGroup,
  Slider,
  Select,
  DatePicker,
  TimePicker,
  Rating,
  DateTimePicker,
} from "components/common";
import { setIn } from "packages/form";
import * as yup from "yup";

export const renderField = (field: FieldMetaDataType) => {
  const { render, schemaValidation, defaultValue, ...others } = field;
  switch (render.componentType) {
    case "textField":
      return <TextField fieldKey={others.name} {...others} />;
    case "select":
      //@ts-ignore
      return <Select fieldKey={others.name} {...others} />;
    case "checkbox":
      return <Checkbox fieldKey={others.name} {...others} />;
    case "checkboxGroup":
      //@ts-ignore
      return <CheckboxGroup fieldKey={others.name} {...others} />;
    case "radio":
      //@ts-ignore
      return <Radio fieldKey={others.name} {...others} />;
    case "switch":
      return <Switch fieldKey={others.name} {...others} />;
    case "switchGroup":
      //@ts-ignore
      return <SwitchGroup fieldKey={others.name} {...others} />;
    case "slider":
      return <Slider fieldKey={others.name} {...others} />;
    case "rating":
      return <Rating fieldKey={others.name} {...others} />;
    case "datePicker":
      return <DatePicker fieldKey={others.name} {...others} />;
    case "timePicker":
      return <TimePicker fieldKey={others.name} {...others} />;
    case "dateTimePicker":
      return <DateTimePicker fieldKey={others.name} {...others} />;
    default:
      return null;
  }
};

// construct Initital Values from metaData
export const constructInitialValue = (fields: FieldMetaDataType[]) => {
  if (!Array.isArray(fields)) {
    return {};
  }
  let initialValuesObj = {};
  for (const field of fields) {
    const { defaultValue, name } = field;
    if (Boolean(defaultValue)) {
      initialValuesObj = setIn(initialValuesObj, name, defaultValue);
    }
  }
  return initialValuesObj;
};

//construct Yup schema from metaData
export const makeYupSchemaFromTemplate = (fields: FieldMetaDataType[]) => {
  if (!Array.isArray(fields)) {
    return yup.object().shape({});
  }
  let schema = {};
  const schemaObject = fields.reduce(createYupSchema, schema);
  const yupScheamObject = yup.object().shape(schemaObject);
  return yupScheamObject;
};

const createYupSchema = (schema, fieldObj: FieldMetaDataType) => {
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
    const { template = [] } = fieldObj;
    const nestedschema = makeYupSchemaFromTemplate(template);
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
