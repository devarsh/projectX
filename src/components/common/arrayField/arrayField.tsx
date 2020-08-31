import React from "react";
import {
  useField,
  useFormFeedback,
  useFieldArray,
  FieldArrayProps,
  FieldProps,
  ValidateFn,
  TemplateFieldRow,
} from "packages/form";

export const MyArrayField: React.FC<FieldArrayProps> = ({
  arrayFieldName,
  template,
}) => {
  const { fieldRows, templateFieldNames, push, remove } = useFieldArray({
    arrayFieldName,
    template,
  });
  const rows = fieldRows.map((row, index) => {
    <TemplateFieldRenderer
      fieldKey={row.fieldKey}
      values={row.values}
      templateRow={templateFieldNames}
      index={index}
      remove={remove}
    />;
  });
  return <div>{rows}</div>;
};

interface TemplateFieldRenderedProps extends TemplateFieldRow {
  templateRow: string[];
  index: number;
  remove: (index: number) => void;
  renderRow: (name: string, key: string) => JSX.Element;
}

export const TemplateFieldRenderer: React.FC<TemplateFieldRenderedProps> = ({
  fieldKey,
  values,
  templateRow,
  index,
  remove,
  renderRow,
}) => {
  const oneRow = templateRow.map((cell) => {
    return renderRow(values[cell].name, values[cell].key);
  });
  return (
    <div key={fieldKey}>
      {oneRow}
      <button onClick={() => remove(index)}>Delete</button>
    </div>
  );
};
