import { lazy } from "react";
import {
  MetaDataType,
  FormRenderConfigType,
  GroupWiseRenderedFieldsType,
  ComponentTypeProps,
  FieldMetaDataType,
  RenderedFieldsType,
} from "./types";
import {
  Checkbox,
  CheckboxGroup,
  Switch,
  SwitchGroup,
  DatePicker,
  TimePicker,
  DateTimePicker,
} from "components/common";
import { PasswordField, NumberFormat } from "components/derived";
import { getIn, setIn, InitialValuesType } from "packages/form";
import * as yup from "yup";
import { FC } from "react";
const Select = lazy(() => import("components/common/select"));
const TextField = lazy(() => import("components/common/textField"));
const Radio = lazy(() => import("components/common/radio"));
const Slider = lazy(() => import("components/common/slider"));
const Rating = lazy(() => import("components/common/rating"));
const Spacer = lazy(() => import("components/common/spacer"));
const ToggleButtonGroup = lazy(
  () => import("components/common/toggleButtonGroup")
);

export const renderFieldsByGroup = (metaData: MetaDataType) => {
  const { fields, form } = metaData;
  const defaultGroup = "defaultGroup";
  let groupWiseRenderer: GroupWiseRenderedFieldsType = {};
  for (const oneField of fields) {
    let currentGroupName = "defaultGroup";
    if (Array.isArray(form.render.groups)) {
      currentGroupName =
        form.render.groups[oneField.render?.group ?? -1] ?? defaultGroup;
    }
    const element = renderField(oneField, form?.render, form?.componentProps);
    let currentGroup: RenderedFieldsType;
    currentGroup = groupWiseRenderer[currentGroupName];
    if (currentGroup === undefined) {
      currentGroup = {
        fields: [],
        sequence: [],
        fieldNames: [],
      };
      groupWiseRenderer[currentGroupName] = currentGroup;
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
    case "toggleButtonGroup":
      Component = ToggleButtonGroup;
      break;
    case "spacer":
      Component = Spacer;
      break;
    default:
      Component = EmptyComponent;
      break;
  }
  if (Component === EmptyComponent) {
    return <Component componentType={render.componentType} />;
  } else if (Component === Spacer) {
    return <Component key={others.name} {...others} />;
  } else {
    const currentComponentTypeProps = componentProps[render.componentType];
    const allProps = { ...currentComponentTypeProps, ...others };
    const gridConfigOverrides = {
      ...formRenderConfig?.gridConfig?.item,
      ...others?.GridProps,
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
export const constructInitialValue = (
  fields: FieldMetaDataType[],
  initialValues?: InitialValuesType
) => {
  if (!Array.isArray(fields)) {
    return {};
  }
  let initialValuesObj = {};
  for (const field of fields) {
    const { defaultValue, name } = field;
    if (Boolean(defaultValue)) {
      initialValuesObj = setIn(initialValuesObj, name, defaultValue);
    } else {
      const value = getIn(initialValues, name, undefined);
      if (Boolean(value)) {
        initialValuesObj = setIn(initialValuesObj, name, value);
      }
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
