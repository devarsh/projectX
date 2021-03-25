import { useCallback, useEffect, useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogAction from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { APIInterfaceForm, BankAPIInterfaceWrapper } from "./apiInterfaceForms";
import { DocumentsPreviewWrapper } from "../docsPreview";
import { documentUploadInitiate } from "../api";
import {
  GSTUploadMetaData,
  BankUploadMetaData,
  ITRUploadMetaData,
} from "./metaData";

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
  const [apiType, setApiType] = useState("");
  const formRef = useRef<any>(null);
  const endSubmitRef = useRef<any>(null);
  const formDataRef = useRef<any>(null);
  const [showDocs, setShowDocs] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const disabled = showDocs === true;
  const handleAPITypeChange = useCallback(
    (event) => setApiType(event.target.value),
    [setApiType]
  );
  const inititateAPIMutation = useMutation(
    InititateDocumentUploadAPI(documentUploadInitiate),
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

  return (
    <div>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <Typography component="div" variant="h6">
            API Calling Interface
          </Typography>
          <Box flexGrow={1} />
          {Boolean(apiType) ? (
            <Button
              onClick={(e) => {
                formRef?.current?.handleSubmit?.(e);
              }}
              disabled={disabled}
              endIcon={disabled ? <CircularProgress size={20} /> : null}
            >
              Proceed
            </Button>
          ) : null}
          <Button
            onClick={closeDialog}
            disabled={inititateAPIMutation.isLoading}
          >
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" margin="0px 16px">
        <FormControl
          component="fieldset"
          size="small"
          margin="dense"
          fullWidth={true}
          disabled={formRef?.current?.isSubmitting}
        >
          <FormLabel component="legend">Select API</FormLabel>
          <RadioGroup
            row
            aria-label="Select API"
            name="apiType"
            value={apiType}
            onChange={handleAPITypeChange}
          >
            <FormControlLabel value="bank" control={<Radio />} label="Bank" />
            <FormControlLabel value="gst" control={<Radio />} label="GST" />
            <FormControlLabel value="itr" control={<Radio />} label="ITR" />
          </RadioGroup>
        </FormControl>
        <Box flexGrow={1} />
      </Box>
      {Boolean(apiType) ? (
        apiType === "itr" ? (
          <APIInterfaceForm
            ref={formRef}
            metaData={ITRUploadMetaData}
            formState={{ refID, moduleType }}
            handleSubmitFn={(data, displayData, endSubmit) => {
              endSubmitRef.current = endSubmit;
              formDataRef.current = data;
              setShowDocs(true);
            }}
          />
        ) : apiType === "bank" ? (
          <BankAPIInterfaceWrapper
            ref={formRef}
            metaData={BankUploadMetaData}
            formState={{ refID, moduleType }}
            handleSubmitFn={(data, displayData, endSubmit) => {
              endSubmitRef.current = endSubmit;
              formDataRef.current = data;
              setShowDocs(true);
            }}
          />
        ) : apiType === "gst" ? (
          <APIInterfaceForm
            ref={formRef}
            metaData={GSTUploadMetaData}
            formState={{ refID, moduleType }}
            handleSubmitFn={(data, displayData, endSubmit) => {
              endSubmitRef.current = endSubmit;
              formDataRef.current = data;
              setShowDocs(true);
            }}
          />
        ) : (
          <div>Invalid doc type</div>
        )
      ) : null}
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
            Documents to be sent for Analysis
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
            docCateg={apiType}
            transformData={(data) => {
              return data;
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const APIInterfaceWrapper = ({
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
