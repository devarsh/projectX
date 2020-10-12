export interface FormMetaDataType {
  name: string;
  resetFieldOnUmnount: boolean;
  validationRun: "onBlur" | "onChange" | "all";
  render: {
    fieldGroups: string[];
    groupEnabled: boolean;
    ordering: "auto" | "sequence";
    renderType: "simple" | "tabs" | "slider" | "accordian";
    gridConfig: {
      item: {
        xs: number;
        sm: number;
        md: number;
      };
      container: {
        direction: "row" | "column" | "rowReverse" | "columnReverse";
      };
    };
  };
}

export interface FieldMetaDataType {
  name: string;
  label: string;
  type?: string;
  defaultValue?: any;
  schemaValidation?: YupSchemaMetaDataType;
  [otherOptions: string]: any;
  template?: FieldMetaDataType[];
}

interface YupSchemaMetaDataType {
  type: string;
  rules?: YupRules[];
}

export interface MetaData {
  form: FormMetaDataType;
  fields: FieldMetaDataType[];
}

interface YupRules {
  name: string;
  params: any[];
}
