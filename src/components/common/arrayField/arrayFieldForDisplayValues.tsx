import { FC, cloneElement, Fragment, useRef } from "react";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { renderValue } from "components/dyanmicForm/utils/valueRenderer";
import { FieldMetaDataType } from "components/dyanmicForm/";
import { MoveSequenceToRender } from "components/dyanmicForm/utils/fixSequenceInMetaData";
import { attachValuesToMetaData } from "components/dyanmicForm/utils/attachValuesToMetaData";
import { MetaDataType } from "components/dyanmicForm";
import { useStyles } from "./style";
export interface ArrayField2Props {
  fieldKey: string;
  name: string;
  label: string;
  //just to satisfy typescript no use
  enableGrid: boolean;
  GridProps?: GridProps;
  _fields: FieldMetaDataType[];
  componentProps?: any;
  removeRowFn?: any;
  arrayFieldIDName?: string;
}

const metaDataTransform = (
  metaData: MetaDataType,
  formDisplayValues: any
): MetaDataType => {
  metaData = MoveSequenceToRender(metaData);
  const transformedFields = attachValuesToMetaData(
    metaData.fields,
    formDisplayValues ?? {}
  );
  return { form: metaData.form, fields: transformedFields };
};

const renderRows = ({ rows, fields }) => null;

export const ArrayFieldValues: FC<ArrayField2Props & { defaultValue: any }> = ({
  name,
  label,
  _fields,
  GridProps,
  enableGrid,
  defaultValue,
  componentProps = {},
}) => {
  let currentFieldsMeta = JSON.parse(
    JSON.stringify(_fields)
  ) as FieldMetaDataType[];
  const classes = useStyles();
  let metaData = { form: {}, fields: currentFieldsMeta } as MetaDataType;
  const transformedMetaData = useRef<MetaDataType | null>(null);
  if (transformedMetaData.current === null) {
    transformedMetaData.current = metaDataTransform(metaData, defaultValue);
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
  //@ts-ignore
  let rows = renderRows(({ row, fields }) => {
    const oneRow = fields.map((field) => {
      const currentFieldMetaData = currentMetaToObj.current[field];
      if (!Boolean(currentFieldMetaData)) {
        return null;
      }
      const component = renderValue(
        currentFieldMetaData,
        //@ts-ignore
        {},
        name,
        componentProps
      );
      const clonedComponent = cloneElement(component, {
        fieldKey: row.cells[field].key,
        name: row.cells[field].name,
      });
      return <Fragment key={row.cells[field].key}>{clonedComponent}</Fragment>;
    });
    return (
      <Fragment key={row.fieldIndexKey}>
        <Grid
          container
          item
          xs={12}
          md={12}
          sm={12}
          spacing={2}
          className={classes.arrayRowContainer}
        >
          {oneRow}
        </Grid>
      </Fragment>
    );
  });
  let result = (
    <Fragment>
      <Card className={classes.arrayRowCard}>
        <CardHeader title={label} />
        <CardContent className={classes.arrayRowCardContent}>
          <Grid container spacing={1} xs={12} md={12} sm={12}>
            {rows}
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
  if (Boolean(enableGrid)) {
    return (
      <Grid container {...GridProps} key={name}>
        {result}
      </Grid>
    );
  } else {
    return <Fragment key={name}>{result}</Fragment>;
  }
};
