import { GridSize, GridSpacing, GridDirection } from "@material-ui/core/Grid";

export interface FormRenderConfigType {
  ordering: "auto" | "sequence"; //implimentation pending
  renderType: "simple" | "tabs" | "stepper" | "accordian"; //implimentation pending
  gridConfig: {
    item?: {
      xs?: GridSize;
      sm?: GridSize;
      md?: GridSize;
      spacing?: GridSpacing;
    };
    container: {
      direction?: GridDirection;
      spacing?: GridSpacing;
    };
  };
}

export interface ComponentTypeProps {
  [options: string]: any;
}

export interface FormMetaDataType {
  name: string;
  label: string;
  resetFieldOnUmnount: boolean;
  validationRun: "onBlur" | "onChange" | "all";
  render: FormRenderConfigType;
  componentProps: ComponentTypeProps;
}

export interface FieldRenderConfigType {
  componentType: string;
  group?: string;
  sequence?: number;
}

export interface FieldMetaDataType {
  name: string;
  label: string;
  render: FieldRenderConfigType;
  type?: string;
  defaultValue?: any;
  schemaValidation?: YupSchemaMetaDataType;
  template?: FieldMetaDataType[];
  [otherOptions: string]: any;
}

interface YupSchemaMetaDataType {
  type: string;
  rules?: YupRulesType[];
}

export interface MetaDataType {
  form: FormMetaDataType;
  fields: FieldMetaDataType[];
}

interface YupRulesType {
  name: string;
  params: any[];
}

interface RenderedFieldsType {
  fields: JSX.Element[];
  sequence: number[];
  fieldNames: string[];
}

export interface GroupWiseRenderedFieldsType {
  [key: string]: RenderedFieldsType;
}
