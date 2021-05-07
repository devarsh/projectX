import { Fragment, useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogAction from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "components/common/alert";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { DocumentsPreviewWrapper } from "../../docsPreview";
import { perfiosUploadInitiate } from "../../api";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { ITRAnalysisMetaData } from "./metadata";

interface InititateDocumentUploadAPIType {
  apiType: string;
  formData: any;
  refID: string;
  moduleType: string;
}

const InititateDocumentUploadAPI = (initiateDocsAPI) => async ({
  apiType,
  formData,
  refID,
  moduleType,
}: InititateDocumentUploadAPIType) => {
  return initiateDocsAPI(apiType, formData, refID, moduleType);
};
const APIInterface = ({ refID, moduleType, closeDialog, isDataChangedRef }) => {
  const apiType = "itr";
  const formState = { refID, moduleType };
  const formRef = useRef<any>(null);
  const endSubmitRef = useRef<any>(null);
  const formDataRef = useRef<any>(null);
  const [showDocs, setShowDocs] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const disabled = showDocs === true;

  const inititateAPIMutation = useMutation(
    InititateDocumentUploadAPI(perfiosUploadInitiate),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        enqueueSnackbar("API Successfully Initialized", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  const cancel = () => {
    endSubmitRef.current(false);
    endSubmitRef.current = null;
    formDataRef.current = null;
    setShowDocs(false);
  };
  if (ITRAnalysisMetaData?.form) {
    ITRAnalysisMetaData.form.formState = formState;
  }

  return (
    <Fragment>
      <FormWrapper
        ref={formRef}
        metaData={ITRAnalysisMetaData as MetaDataType}
        initialValues={{}}
        onSubmitHandler={(data, displayData, endSubmit) => {
          endSubmitRef.current = endSubmit;
          formDataRef.current = data;
          setShowDocs(true);
        }}
        displayMode={"new"}
        disableGroupErrorDetection={true}
        disableGroupExclude={true}
        hideTitleBar={false}
        hideDisplayModeInTitle={true}
      >
        <Button
          onClick={(e) => {
            formRef?.current?.handleSubmit?.(e);
          }}
          disabled={disabled}
          endIcon={disabled ? <CircularProgress size={20} /> : null}
        >
          Proceed
        </Button>
        <Button onClick={closeDialog} disabled={inititateAPIMutation.isLoading}>
          Close
        </Button>
      </FormWrapper>
      <Dialog
        open={showDocs}
        maxWidth="xl"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        {inititateAPIMutation?.isError ? (
          <Alert
            severity="error"
            errorMsg={
              inititateAPIMutation.error?.error_msg ?? "Unknown error occured"
            }
            errorDetail={inititateAPIMutation.error?.error_detail ?? ""}
          />
        ) : null}
        <DialogAction style={{ display: "flex", padding: "8px 24px" }}>
          <Typography variant="h6" color="textSecondary">
            ITR Documents to be sent for Analysis
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Button
            onClick={() =>
              inititateAPIMutation.mutate({
                apiType,
                formData: formDataRef.current,
                refID,
                moduleType,
              })
            }
            disabled={inititateAPIMutation.isLoading}
            endIcon={
              inititateAPIMutation.isLoading ? (
                <CircularProgress size={20} />
              ) : null
            }
          >
            Initiate
          </Button>
          <Button
            onClick={() => cancel()}
            disabled={inititateAPIMutation.isLoading}
          >
            Cancel
          </Button>
        </DialogAction>
        <DialogContent>
          <DocumentsPreviewWrapper
            refID={refID}
            serialNo={formDataRef.current?.management}
            isManagement={Boolean(formDataRef.current?.management)}
            docCateg={[
              {
                label: "ITR",
                type: "itr",
                primary: true,
                categoryCD: "ITR_DOC_TYPE",
              },
            ]}
            transformData={(data) => {
              if (Array.isArray(data)) {
                return data.filter((one) => one.docCategory === "ITR_DOC_TYPE");
              }
              return data;
            }}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export const ITRAPIInterface = ({
  refID,
  moduleType,
  closeDialog,
  isDataChangedRef,
}) => {
  return (
    <RecoilRoot>
      <APIInterface
        refID={refID}
        moduleType={moduleType}
        closeDialog={closeDialog}
        isDataChangedRef={isDataChangedRef}
      />
    </RecoilRoot>
  );
};
