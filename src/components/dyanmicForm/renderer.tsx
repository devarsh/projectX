import { lazy } from "react";
import {
  MetaDataType,
  FormRenderConfigType,
  GroupWiseRenderedFieldsType,
  ComponentTypeProps,
  FieldMetaDataType,
} from "./types";
import {
  TextField,
  Checkbox,
  CheckboxGroup,
  Radio,
  Switch,
  SwitchGroup,
  Slider,
  DatePicker,
  TimePicker,
  Rating,
  DateTimePicker,
} from "components/common";
import { PasswordField, NumberFormat } from "components/derived";
import { setIn } from "packages/form";
import * as yup from "yup";
import { FC } from "react";
const Select = lazy(() => import("components/common/select"));

export const renderFieldsByGroup = (metaData: MetaDataType) => {
  const { fields, form } = metaData;
  const defaultGroup = "defaultGroup";
  let groupWiseRenderer: GroupWiseRenderedFieldsType = {};
  for (const oneField of fields) {
    const element = renderField(oneField, form?.render, form?.componentProps);
    let currentGroup = groupWiseRenderer[oneField.render.group ?? defaultGroup];
    if (currentGroup === undefined) {
      currentGroup = {
        fields: [],
        sequence: [],
        fieldNames: [],
      };
      groupWiseRenderer[oneField.render.group ?? defaultGroup] = currentGroup;
    }
    currentGroup.fields.push(element);
    currentGroup.sequence.push(oneField?.render?.sequence ?? 0);
    currentGroup.fieldNames.push(oneField.name);
  }
  //sort them by sequence
  if (form.render.ordering === "sequence") {
    const groups = Object.keys(groupWiseRenderer);
    for (const group of groups) {
      const currentGroup = groupWiseRenderer[group];
      //improve sorting
      for (let i = 0; i < currentGroup.sequence.length; i++) {
        for (let j = i + 1; j < currentGroup.sequence.length; j++) {
          if (currentGroup.sequence[i] > currentGroup.sequence[j]) {
            const temp = currentGroup.sequence[j];
            currentGroup.sequence[j] = currentGroup.sequence[i];
            currentGroup.sequence[i] = temp;
            const temp1 = currentGroup.fields[j];
            currentGroup.fields[j] = currentGroup.fields[i];
            currentGroup.fields[i] = temp1;
            const temp2 = currentGroup.fieldNames[j];
            currentGroup.fieldNames[j] = currentGroup.fieldNames[i];
            currentGroup.fieldNames[i] = temp2;
          }
        }
      }
    }
  }
  return groupWiseRenderer;
};

const EmptyComponent: FC<{ componentType: string }> = ({ componentType }) => {
  return <div>No Component of type: ${componentType}</div>;
};

const renderField = (
  fieldObj: FieldMetaDataType,
  formRenderConfig: FormRenderConfigType,
  componentProps: ComponentTypeProps
) => {
  const { render, schemaValidation, defaultValue, ...others } = fieldObj;
  let Component: any = null;
  switch (render.componentType) {
    case "textField":
      Component = TextField;
      break;
    case "select":
      Component = Select;
      break;
    case "checkbox":
      Component = Checkbox;
      break;
    case "checkboxGroup":
      Component = CheckboxGroup;
      break;
    case "radio":
      Component = Radio;
      break;
    case "switch":
      Component = Switch;
      break;
    case "switchGroup":
      Component = SwitchGroup;
      break;
    case "slider":
      Component = Slider;
      break;
    case "rating":
      Component = Rating;
      break;
    case "datePicker":
      Component = DatePicker;
      break;
    case "timePicker":
      Component = TimePicker;
      break;
    case "datetimePicker":
      Component = DateTimePicker;
      break;
    case "passwordField":
      Component = PasswordField;
      break;
    case "numberFormat":
      Component = NumberFormat;
      break;
    default:
      Component = EmptyComponent;
      break;
  }
  if (Component === EmptyComponent) {
    return <Component componentType={render.componentType} />;
  } else {
    const currentComponentTypeProps = componentProps[render.componentType];
    const allProps = { ...currentComponentTypeProps, ...others };
    const gridConfigOverrides = {
      ...formRenderConfig?.gridConfig?.item,
      ...others.GridProps,
    };
    return (
      <Component
        {...allProps}
        fieldKey={others.name}
        key={others.name}
        enableGrid={true}
        GridProps={{
          item: true,
          xs: gridConfigOverrides?.xs ?? "auto",
          md: gridConfigOverrides?.sm ?? "auto",
          xl: gridConfigOverrides?.xs ?? "auto",
        }}
      />
    );
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
