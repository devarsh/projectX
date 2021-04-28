import { Fragment, useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogAction from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { DocumentsPreviewWrapper } from "../docsPreview";
import { perfiosUploadInitiate } from "../api";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { GSTAnalysisMetaData } from "./metadata";

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
  const apiType = "gst";
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
  if (GSTAnalysisMetaData?.form) {
    GSTAnalysisMetaData.form.formState = formState;
  }

  return (
    <Fragment>
      <FormWrapper
        ref={formRef}
        metaData={GSTAnalysisMetaData as MetaDataType}
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
          <Alert severity="error">
            {inititateAPIMutation.error?.error_msg ?? "Unknown error occured"}
          </Alert>
        ) : null}
        <DialogAction style={{ display: "flex", padding: "8px 24px" }}>
          <Typography variant="h6" color="textSecondary">
            GST Documents to be sent for Analysis
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
                label: "Analysis",
                type: "gst",
                primary: true,
                categoryCD: "GST_DOC_TYPE",
              },
            ]}
            transformData={(data) => {
              if (Array.isArray(data)) {
                const currentDocType =
                  formDataRef.current?.processFor === "GSTR1"
                    ? "GSTR1"
                    : formDataRef.current?.processFor === "GSTR3"
                    ? "GSTR-3B"
                    : "All";
                return data.filter((one) => {
                  if (one.docCategory === "GST_DOC_TYPE") {
                    if (currentDocType === "All") {
                      return true;
                    } else if (one.docType === currentDocType) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  return false;
                });
              }
              return data;
            }}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export const GSTAPIInterface = ({
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
