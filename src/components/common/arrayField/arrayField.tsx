import { FC, cloneElement, Fragment, Suspense, useRef } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { renderField } from "components/dyanmicForm/utils/fieldRenderer";
import { FieldMetaDataType } from "components/dyanmicForm/";
import { useFieldArray, UseFieldArrayHookProps, RenderFn } from "packages/form";
import { extendFieldTypes } from "components/dyanmicForm/utils/extendedFieldTypes";
import { extendedMetaData } from "components/dyanmicForm/extendedTypes";
import { attachMethodsToMetaData } from "components/dyanmicForm/utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "components/dyanmicForm/utils/functionRegistry";
import { MoveSequenceToRender } from "components/dyanmicForm/utils/fixSequenceInMetaData";
import { MetaDataType } from "components/dyanmicForm";
interface RenderParentAttribs {
  rows: JSX.Element[];
  key: string;
  push: () => void;
}

export interface ArrayFieldProps extends UseFieldArrayHookProps {
  renderParentFn: (options: RenderParentAttribs) => JSX.Element;
  renderRowsFn: RenderFn;
}

const ArrayField: FC<ArrayFieldProps> = ({
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

export default ArrayField;

export interface ArrayField2Props {
  name: string;
  label: string;
  //just to satisfy typescript no use
  GridProps?: GridProps;
  _fields: FieldMetaDataType[];
}

const metaDataTransform = (metaData: MetaDataType): MetaDataType => {
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  metaData = MoveSequenceToRender(metaData);
  return metaData;
};

export const ArrayField2: FC<ArrayField2Props> = ({ name, label, _fields }) => {
  let currentFieldsMeta = JSON.parse(
    JSON.stringify(_fields)
  ) as FieldMetaDataType[];
  let metaData = { form: {}, fields: currentFieldsMeta } as MetaDataType;
  const transformedMetaData = useRef<MetaDataType | null>(null);
  if (transformedMetaData.current === null) {
    transformedMetaData.current = metaDataTransform(metaData);
  }
  const template = useRef(
    transformedMetaData?.current?.fields?.reduce((accum, one) => {
      accum[one.name] = "";
      return accum;
    }, {})
  );

  const currentMetaToObj = useRef(
    transformedMetaData?.current?.fields?.reduce((accum, one) => {
      accum[one.name] = one;
      return accum;
    }, {})
  );

  const { renderRows, push } = useFieldArray({
    arrayFieldName: name,
    template: template.current,
  });
  let rows = renderRows(({ row, removeFn, rowIndex, fields }) => {
    const oneRow = fields.map((field) => {
      const currentFieldMetaData = currentMetaToObj.current[field];
      if (!Boolean(currentFieldMetaData)) {
        return null;
      }
      const component = renderField(
        currentFieldMetaData,
        //@ts-ignore
        {},
        name,
        {}
      );
      const clonedComponent = cloneElement(component, {
        fieldKey: row.cells[field].key,
        name: row.cells[field].name,
      });
      return <Fragment key={row.cells[field].key}>{clonedComponent}</Fragment>;
    });
    return (
      <Grid container item key={row.fieldIndexKey}>
        {oneRow}
        <Button onClick={() => removeFn(rowIndex)}>Remove Key</Button>
      </Grid>
    );
  });

  return (
    <Fragment key={name}>
      <Suspense fallback={<div>loading...</div>}>
        <Typography variant="h6">{label}</Typography>
        <Button onClick={() => push()}>Add Field</Button>
        <Grid container>{rows}</Grid>
      </Suspense>
    </Fragment>
  );
};
