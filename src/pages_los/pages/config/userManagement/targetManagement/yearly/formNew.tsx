import { FC, useRef, Fragment, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import Grid from "@material-ui/core/Grid";
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
import { yearlyTargetFormMetaData } from "./metaData";
import { transformMetaData } from "./transformMetaData";
import loaderGif from "assets/images/loader.gif";
import { CRUDContext } from "pages_los/common";

const insertFormDataFnWrapper = (insertFormData) => async (data) => {
  console.log(data);
  return insertFormData(data);
};

export const FormNew: FC<{
  isDataChangedRef: any;
  successAction: any;
  cancelAction: any;
}> = ({ isDataChangedRef, successAction, cancelAction }) => {
  const { context } = useContext(CRUDContext);
  const formRef = useRef<any>(null);
  const endSubmitRef = useRef<any>(null);
  const [currentBranch, setCurrentBranch] = useState<any>(null);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const result = useQuery<any, any, any>(
    ["getUserBranchList", context.userID],
    () => API.getUserBranchList(context.userID)
  );

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
    insertFormDataFnWrapper(
      API.insertYearlyTargetData({
        moduleType: context.moduleType,
        productType: context.productType,
        userID: context.userID,
      })
    ),
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
            {Boolean(currentBranch) ? (
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
            disabled={isSubmitting}
          />
          <Box flexGrow={1} />
        </Box>
        {currentBranch !== null && currentBranch !== "00" ? (
          <FormWrapper
            ref={formRef}
            metaData={yearlyTargetFormMetaData as MetaDataType}
            onSubmitHandler={(data, displayData, endSubmit) => {
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

/*
let newMetaData = yearlyTargetFormMetaData as MetaDataType;
  if (currentBranch !== "") {
    newMetaData = transformMetaData(
      yearlyTargetFormMetaData,
      result?.data?.others
    );
  }
*/
