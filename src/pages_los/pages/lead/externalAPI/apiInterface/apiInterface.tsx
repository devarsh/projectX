import { useCallback, useRef, useState } from "react";
import { RecoilRoot } from "recoil";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import { LOSSDK } from "registry/fns/los";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogAction from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box";
import { APIInterfaceForm, BankAPIInterfaceWrapper } from "./apiInterfaceForms";
import { DocumentsPreviewWrapper } from "../docsPreview";
import {
  GSTUploadMetaData,
  BankUploadMetaData,
  ITRUploadMetaData,
} from "./metaData";

export const APIInterface = ({
  refID,
  moduleType,
  closeDialog,
  isDataChangedRef,
}) => {
  const [apiType, setApiType] = useState("");

  const endSubmitRef = useRef<any>(null);
  const formDataRef = useRef<any>(null);
  const [showDocs, setShowDocs] = useState(false);

  const handleAPITypeChange = useCallback(
    (event) => setApiType(event.target.value),
    [setApiType]
  );

  const cancel = () => {
    endSubmitRef.current(false);
    endSubmitRef.current = null;
    formDataRef.current = null;
    setShowDocs(false);
  };

  //handle API Submitting here - Aayesha
  const handleApiInititation = () => {
    LOSSDK.documentUploadInitiate(apiType, formDataRef, refID, moduleType);
    isDataChangedRef.current = true;
    closeDialog();
  };

  return (
    <div>
      <RecoilRoot key={`${apiType}`}>
        <Box display="flex" margin="0px 16px">
          <FormControl
            component="fieldset"
            size="small"
            margin="dense"
            fullWidth={true}
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
          <Button onClick={closeDialog}>Close</Button>
        </Box>
        {Boolean(apiType) ? (
          apiType === "itr" ? (
            <APIInterfaceForm
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
          <DialogAction style={{ display: "flex", padding: "8px 24px" }}>
            <Typography variant="h6" color="textSecondary">
              Documents to be sent for Analysis
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Button onClick={() => handleApiInititation()}>Initiate</Button>
            <Button onClick={() => cancel()}>Cancel</Button>
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
      </RecoilRoot>
    </div>
  );
};
