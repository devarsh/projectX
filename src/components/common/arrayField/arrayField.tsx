import React from "react";
import { useFieldArray, FieldArrayProps, RenderFn } from "packages/form";

interface RenderParentAttribs {
  rows: JSX.Element[];
  key: string;
  push: () => void;
}

interface ArrayFieldProps extends FieldArrayProps {
  renderParentFn: (options: RenderParentAttribs) => JSX.Element;
  renderRowsFn: RenderFn;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  arrayFieldName,
  template,
  renderParentFn,
  renderRowsFn,
}) => {
  const { renderRows, push } = useFieldArray({
    arrayFieldName,
    template,
  });
  if (
    typeof renderRowsFn === "function" &&
    typeof renderParentFn === "function"
  ) {
    const key = `${arrayFieldName}`;
    const rows = renderRows(renderRowsFn);
    return renderParentFn({ rows, key, push });
  } else {
    console.log(
      "Expected renderRowFn type as function but got",
      typeof renderParentFn
    );
    console.log(
      "Expecte renderParentFn type as function but got",
      typeof renderRowsFn
    );
    return null;
  }
};
