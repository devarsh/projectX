import { useCallback, useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogAction from "@material-ui/core/DialogActions";
import { APIInterfaceForm } from "./apiInterfaceForms";
import { DocumentsPreviewWrapper } from "../docsPreview";
import {
  GSTUploadMetaData,
  BankUploadMetaData,
  ITRUploadMetaData,
} from "./metaData";
import { useStyles } from "./styles";

export const APIInterface = ({
  refID,
  moduleType,
  cancelAction,
  isDataChangedRef,
}) => {
  const [docType, setDocType] = useState("");

  const classes = useStyles();
  const endSubmitRef = useRef<any>(null);
  const formDataRef = useRef<any>(null);
  const [showDocs, setShowDocs] = useState(false);

  const handleApiTypeChange = useCallback(
    (_, newApiType) => setDocType(newApiType),
    [setDocType]
  );

  const cancel = () => {
    endSubmitRef.current(false);
    endSubmitRef.current = null;
    formDataRef.current = null;
    setShowDocs(false);
  };

  return (
    <div>
      <RecoilRoot key={`${docType}`}>
        <Grid container spacing={2} style={{ margin: "0px 16px" }}>
          <Grid item xs={4} md={4} sm={4}>
            <Typography className={classes.filterType}>API Type</Typography>
            <Paper elevation={0} className={classes.paper}>
              <ToggleButtonGroup
                size="small"
                value={docType}
                exclusive
                onChange={handleApiTypeChange}
              >
                <ToggleButton value="bank">Bank</ToggleButton>
                <ToggleButton value="itr">ITR</ToggleButton>
                <ToggleButton value="gst">GST</ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Grid>
        </Grid>
        {Boolean(docType) ? (
          docType === "itr" ? (
            <APIInterfaceForm
              metaData={ITRUploadMetaData}
              formState={{ refID, moduleType, productType: "itrupload" }}
              handleSubmitFn={(data, displayData, endSubmit) => {
                endSubmitRef.current = endSubmit;
                formDataRef.current = data;
                setShowDocs(true);
              }}
            />
          ) : docType === "bank" ? (
            <APIInterfaceForm
              metaData={BankUploadMetaData}
              formState={{ refID, moduleType, productType: "bankupload" }}
              handleSubmitFn={(data, displayData, endSubmit) => {
                endSubmitRef.current = endSubmit;
                formDataRef.current = data;
                setShowDocs(true);
              }}
            />
          ) : docType === "gst" ? (
            <APIInterfaceForm
              metaData={GSTUploadMetaData}
              formState={{ refID, moduleType, productType: "gstupload" }}
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
            <Button onClick={() => {}}>Submit</Button>
            <Button onClick={() => cancel()}>Cancel</Button>
          </DialogAction>
          <DialogContent>
            <DocumentsPreviewWrapper
              refID={refID}
              serialNo={formDataRef.current?.management}
              isManagement={Boolean(formDataRef.current?.management)}
              docCateg={docType}
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
