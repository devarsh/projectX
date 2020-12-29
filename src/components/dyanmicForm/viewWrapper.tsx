import { FC, Suspense, useRef } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
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
  formData: InitialValuesType;
  hidden?: boolean;
}

interface FormProps {
  fields: GroupWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  formDisplayName: string;
}

export const ViewFormWrapper: FC<ViewFormWrapperProps> = ({
  metaData,
  formData,
  hidden = false,
}) => {
  metaData = MoveSequenceToRender(metaData);
  const transformedFields = attachValuesToMetaData(
    metaData.fields,
    formData ?? {}
  );
  const transformedMetaData = {
    form: metaData.form,
    fields: transformedFields,
  } as MetaDataType;
  const groupWiseFields = renderValuesByGroup(transformedMetaData);
  const formRenderType = metaData.form.render.renderType ?? "simple";
  return (
    <Container component="main" style={{ display: hidden ? "none" : "block" }}>
      {formRenderType === "stepper" || formRenderType === "tabs" ? (
        <GroupedView
          key={metaData.form.name}
          fields={groupWiseFields}
          formRenderConfig={metaData.form.render}
          formDisplayName={metaData.form.label}
        />
      ) : formRenderType === "simple" ? (
        <SimpleView
          key={metaData.form.name}
          fields={groupWiseFields}
          formRenderConfig={metaData.form.render}
          formDisplayName={metaData.form.label}
        />
      ) : (
        <div>RenderType {formRenderType} not available</div>
      )}
    </Container>
  );
};

const SimpleView: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
}) => {
  const classes = useStyles();
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
    <div>
      <Typography component="h3" className={classes.title}>
        {formDisplayName} View Only
      </Typography>
      <div className={classes.form}>
        <Grid
          container={true}
          spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
          direction={
            formRenderConfig?.gridConfig?.container?.direction ?? "row"
          }
        >
          <Suspense fallback={<div>Loading...</div>}>{FormComponent}</Suspense>
        </Grid>
      </div>
    </div>
  );
};

const GroupedView: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
}) => {
  const defaultGroupName = "DefaultGroup";
  const classes = useStyles();
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const steps = fieldGroups.current.map((one) => {
    const current = fields[one];
    return (
      <>
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
      </>
    );
  });
  return (
    <div>
      <Typography component="h3" className={classes.title}>
        {formDisplayName} View Only
      </Typography>
      <Divider />
      <div className={classes.form}>
        <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>
      </div>
    </div>
  );
};
