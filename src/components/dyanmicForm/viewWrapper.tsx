import { FC, Suspense, useRef, Fragment } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { InitialValuesType } from "packages/form";
import { renderValuesByGroup } from "./utils/groupWiserenderer";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
import { attachValuesToMetaData } from "./utils/attachValuesToMetaData";
import {
  MetaDataType,
  GroupWiseRenderedFieldsType,
  FormRenderConfigType,
} from "./types";
import { useStyles } from "./style";

interface ViewFormWrapperProps {
  metaData: MetaDataType;
  formDisplayValues: InitialValuesType;
  hidden?: boolean;
  submitting: boolean;
  onAccept: any;
  onReject: any;
}

interface FormProps {
  fields: GroupWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  classes?: any;
}

export const ViewFormWrapper: FC<ViewFormWrapperProps> = ({
  metaData,
  formDisplayValues,
  hidden = false,
  submitting,
  onAccept,
  onReject,
}) => {
  metaData = MoveSequenceToRender(metaData);
  const transformedFields = attachValuesToMetaData(
    metaData.fields,
    formDisplayValues ?? {}
  );
  const transformedMetaData = {
    form: metaData.form,
    fields: transformedFields,
  } as MetaDataType;
  const groupWiseFields = renderValuesByGroup(transformedMetaData);
  const formRenderType = metaData.form.render.renderType ?? "simple";
  const classes = useStyles();
  return (
    <Container component="main" style={{ display: hidden ? "none" : "block" }}>
      <Typography component="h3" className={classes.title}>
        {metaData.form.label} View Only
      </Typography>
      <Divider />
      <div className={classes.form}>
        {formRenderType === "stepper" || formRenderType === "tabs" ? (
          <GroupedView
            key={`${metaData.form.name}-grouped`}
            fields={groupWiseFields}
            formRenderConfig={metaData.form.render}
            classes={classes}
          />
        ) : formRenderType === "simple" ? (
          <SimpleView
            key={`${metaData.form.name}-simple`}
            fields={groupWiseFields}
            formRenderConfig={metaData.form.render}
          />
        ) : (
          <div>RenderType {formRenderType} not available</div>
        )}
      </div>
      <Box width={1} display="flex" justifyContent="flex-end">
        <Button
          type="button"
          className={classes.backBtn}
          onClick={() => onReject("")}
          disabled={submitting}
        >
          {metaData?.form?.render?.labels?.prev ?? "Go Back"}
        </Button>
        <div className={classes.buttonWrapper}>
          <Button
            type="button"
            className={classes.submit}
            onClick={onAccept}
            disabled={submitting}
          >
            {metaData?.form?.render?.labels?.complete ?? "Accept"}
          </Button>
          {submitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Box>
    </Container>
  );
};

const SimpleView: FC<FormProps> = ({ fields, formRenderConfig }) => {
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const formComponentGroupWise = fieldGroups.current.map((one) => {
    const current = fields[one];
    return current.fields;
  });
  const FormComponent = formComponentGroupWise.reduce((one, accum) => {
    const newAccum = [...accum, ...one];
    return newAccum;
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid
        container={true}
        spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
        direction={formRenderConfig?.gridConfig?.container?.direction ?? "row"}
      >
        {FormComponent}
      </Grid>
    </Suspense>
  );
};

const GroupedView: FC<FormProps> = ({ fields, formRenderConfig, classes }) => {
  const defaultGroupName = "DefaultGroup";
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const steps = fieldGroups.current.map((one, index) => {
    const current = fields[one];
    return (
      <Fragment key={index}>
        <Typography component="h4" className={classes.subTitle}>
          {typeof formRenderConfig.groups === "object"
            ? formRenderConfig.groups[fieldGroups.current[one]]
            : defaultGroupName}
        </Typography>
        <Grid
          key={one}
          container={true}
          spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
          direction={
            formRenderConfig?.gridConfig?.container?.direction ?? "row"
          }
        >
          {current.fields}
        </Grid>
        <Divider />
      </Fragment>
    );
  });
  return <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>;
};
