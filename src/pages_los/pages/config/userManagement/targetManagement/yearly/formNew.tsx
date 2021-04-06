import { FC, useRef, Fragment, useState, useContext } from "react";
import { useQuery, useMutation } from "react-query";
import Alert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SelectRenderOnly } from "components/common/select";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useSnackbar } from "notistack";
import * as API from "./api";
import { transformMetaData } from "./transformMetaData";
import loaderGif from "assets/images/loader.gif";
import { CRUDContext } from "pages_los/common";
import { getValidateValue } from "registry/fns/misc/others";

const insertFormDataFnWrapper = (insertFormData) => async (data) => {
  return insertFormData(data);
};

export const FormNew: FC<{
  isDataChangedRef: any;
  successAction: any;
  cancelAction: any;
}> = ({ isDataChangedRef, successAction, cancelAction }) => {
  const { context, getFormMetaData, insertFormData } = useContext(CRUDContext);
  const formRef = useRef<any>(null);
  const endSubmitRef = useRef<any>(null);
  const [currentBranch, setCurrentBranch] = useState<any>(null);
  const [currentBranchError, setCurrentBranchError] = useState<any>("");
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const result = useQuery<any, any, any>(
    ["getYearlyTargetUserBranchList", context.userID],
    () => API.getYearlyTargetUserBranchList(context.userID)
  );
  const formNewMetaData = getFormMetaData.fn(getFormMetaData.args)("new");

  const handleBranchChange = (e) => {
    setCurrentBranch(e.target.value);
    if (Array.isArray(result.data) && result.data.length > 0) {
      let currentProd = result.data.filter(
        (one) => one.value === e.target.value
      );
      setCurrentProduct(currentProd[0]?.products);
    }
  };

  const inititateAPIMutation = useMutation(
    insertFormDataFnWrapper(insertFormData.fn(insertFormData.args)),
    {
      onError: (error: any) => {
        endSubmitRef.current(false);
        setIsSubmitting(false);
      },
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        enqueueSnackbar("API Successfully Initialized", {
          variant: "success",
        });
        successAction();
      },
    }
  );

  const renderResult =
    result.isLoading || result.isFetching ? (
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
    ) : result.isError === true ? (
      <span>{result.error?.error_msg ?? "Unknown error occured"}</span>
    ) : (
      <Fragment>
        <AppBar position="relative" color="secondary">
          <Toolbar>
            <Typography component="div" variant="h6">
              Perfios Upload API Calling Interface
            </Typography>
            <Box flexGrow={1} />
            {Boolean(currentBranch) && !Boolean(currentBranchError) ? (
              <Button
                onClick={(e) => {
                  formRef?.current?.handleSubmit?.(e);
                }}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                Proceed
              </Button>
            ) : null}
            <Button
              onClick={cancelAction}
              disabled={inititateAPIMutation.isLoading}
            >
              Close
            </Button>
          </Toolbar>
          {inititateAPIMutation.isError ? (
            <Alert severity="error">
              {inititateAPIMutation.error?.error_msg ?? "Uknown Error occured"}
            </Alert>
          ) : null}
        </AppBar>
        <Box display="flex" margin="0px 16px">
          <SelectRenderOnly
            name="branch"
            size="small"
            margin="normal"
            required
            fullWidth
            label="Select Branch"
            options={result?.data ?? []}
            value={currentBranch ?? ""}
            autoComplete="off"
            handleChange={handleBranchChange}
            handleBlur={async () => {
              let result = await getValidateValue({ value: currentBranch });
              if (Boolean(result)) {
                setCurrentBranchError(result);
              } else {
                setCurrentBranchError("");
              }
            }}
            disabled={isSubmitting}
            error={currentBranchError}
            touched={true}
          />
          <Box flexGrow={1} />
        </Box>
        {currentBranch !== null && currentBranch !== "00" ? (
          <FormWrapper
            ref={formRef}
            metaData={transformMetaData(
              formNewMetaData as MetaDataType,
              currentProduct
            )}
            onSubmitHandler={(data, displayData, endSubmit) => {
              if (Boolean(currentBranchError)) {
                endSubmit(false);
              }
              endSubmitRef.current = endSubmit;
              inititateAPIMutation.mutate({
                ...data,
                branchCode: currentBranch,
              });
              setIsSubmitting(true);
            }}
            displayMode={"new"}
            disableGroupErrorDetection={true}
            disableGroupExclude={true}
            hideTitleBar={true}
          />
        ) : null}
      </Fragment>
    );
  return renderResult;
};
