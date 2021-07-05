import { useEffect, FC } from "react";
import loaderGif from "assets/images/loader.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { useQuery } from "react-query";
import { InitialValuesType } from "packages/form";
import { cloneDeep } from "lodash-es";
import { queryClient } from "cache";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { moveToInquiryMetaData } from "./metadata";
import * as API from "../coldCallingCRUD/api";

export const MoveToInquiry: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView: "edit";
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
  disableCache?: boolean;
  refID: any;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView,
  setEditFormStateFromInitValues,
  refID,
}) => {
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getColdCallingFormData", moduleType, refID]);
    };
  }, [refID]);

  const result = useQuery(["getColdCallingFormData", moduleType, refID], () =>
    API.getColdCallingFormData({ moduleType })(refID)
  );

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let formEditData = result.data;

  let metaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    metaData = cloneDeep(moveToInquiryMetaData) as MetaDataType;

    metaData.form.formState = {
      formCode: metaData.form.name,
      ...formStateFromInitValues,
    };
    metaData.form.name = `${metaData.form.name}-edit`;
    if (metaData?.form?.render?.renderType === "stepper") {
      metaData.form.render.renderType = "tabs";
    }
  }

  const renderResult = loading ? (
    <>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : isError === true ? (
    <>
      <span>{errorMsg}</span>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : defaultView === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${defaultView}`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={() => {}}
      //@ts-ignore
      displayMode={defaultView}
      disableGroupErrorDetection={false}
      disableGroupExclude={true}
    >
      {({ isSubmitting, handleSubmit }) => (
        <>
          <Button
            onClick={closeDialog}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            Save
          </Button>
          <Button onClick={closeDialog} disabled={isSubmitting}>
            Cancel
          </Button>
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};
