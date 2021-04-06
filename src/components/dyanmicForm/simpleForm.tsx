import { FC, useRef, Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import { FormProps } from "./types";

export const SimpleForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  children,
}) => {
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const formComponentGroupWise = fieldGroups.current.map((one) => {
    const current = fields[one];
    return current.fields;
  });
  const fieldsToRender = formComponentGroupWise.reduce((one, accum) => {
    const newAccum = [...accum, ...one];
    return newAccum;
  }, []);

  return typeof children === "function" ? (
    children({
      fieldsToRender,
      spacing: formRenderConfig?.gridConfig?.container?.spacing ?? 2,
      direction: formRenderConfig?.gridConfig?.container?.direction ?? "row",
    })
  ) : (
    <Grid
      container={true}
      spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
      direction={formRenderConfig?.gridConfig?.container?.direction ?? "row"}
    >
      <Suspense fallback={<div>Loading...</div>}>{fieldsToRender}</Suspense>
    </Grid>
  );
};
