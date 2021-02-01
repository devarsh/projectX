import { Fragment, useContext, useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { FileListing } from "components/fileUpload/fileListing";
import { useMutation } from "react-query";
import { queryClient } from "cache";
import { DocumentContext } from "./context";
import { breadcrumbPathRenderer } from "./utils";
import { LOSSDK } from "registry/fns/los";
import { retriveFileStatus } from "./utils";

export const FileListingWithConfirmation = ({
  type,
  refID,
  docs,
  metaData,
}) => {
  const docContext: any = useContext(DocumentContext);
  const currentViewDocs = docs.reduce((accum, current) => {
    if (String(current.docID) === String(docContext.docID)) {
      accum.push({
        file: LOSSDK.constructDocumentDownloadURL(type, current.file),
        name: current.name,
        mimeType: current.mimeType,
      });
    }
    return accum;
  }, []);
  let result = fetchCurrentDocuments(
    metaData,
    docContext.groupID,
    docContext.docID
  );
  const status = retriveFileStatus(result?.status);
  const comment = result?.comments ?? "";
  const severity =
    status === "pending" ? "info" : status === "rejected" ? "error" : "success";
  return (
    <Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            docContext.setFoldersPath();
          }}
        >
          Documents
        </Link>
        {breadcrumbPathRenderer(docContext.path)}
      </Breadcrumbs>
      <Alert severity={severity}>
        Confirmation:{" "}
        <span style={{ textTransform: "capitalize" }}>{status}</span>
        {status !== "pending" ? (
          <span>Confirmation Message: {comment}</span>
        ) : null}
      </Alert>
      <div style={{ height: "275px", margin: "4px", overflowY: "scroll" }}>
        <FileListing
          files={currentViewDocs}
          dense={true}
          disableDelete={true}
          disablePreview={false}
          handleDeleteFile={() => {}}
          disabled={false}
        />
      </div>
      {status === "pending" ? (
        <ConfirmationBox type={type} refID={refID} docContext={docContext} />
      ) : null}
    </Fragment>
  );
};

const fetchCurrentDocuments = (metaData, groupID, docID) => {
  if (!Array.isArray(metaData)) {
    return null;
  }
  const currentIndex = metaData.findIndex((one) => one.groupCode === groupID);
  if (currentIndex >= 0) {
    const docs = metaData[currentIndex].items;
    if (Array.isArray(docs)) {
      const currentIndex = docs.findIndex(
        (one) => String(one.docID) === String(docID)
      );
      if (currentIndex >= 0) {
        return docs[currentIndex];
      }
    }
  }
  return null;
};

interface DocStatusModify {
  type: string;
  refID: string;
  docID: string;
  confirmMessage: string;
}

const verifyDocs = ({
  type,
  refID,
  docID,
  confirmMessage,
}: DocStatusModify) => {
  return LOSSDK.verifyDocuments(type, refID, docID, confirmMessage);
};

const rejectDocs = ({
  type,
  refID,
  docID,
  confirmMessage,
}: DocStatusModify) => {
  return LOSSDK.rejectDocuments(type, refID, docID, confirmMessage);
};

const ConfirmationBox = ({ type, refID, docContext }) => {
  const docID = docContext.docID;
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const maxLength = 200;
  const verifyDocsFn = useMutation(verifyDocs, {
    onMutate: () => {
      setIsSubmitting(true);
    },
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      setIsSubmitting(false);
      docContext?.setSnackBarMessage({
        message: "error confirming documents",
        type: "error",
      });
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["getDocumentListingTemplate", type, refID]);
      queryClient.refetchQueries(["getDocumentsList", type, refID]);
      setError("");
      docContext?.setSnackBarMessage({
        message: "document status updated",
        type: "successs",
      });
      setIsSubmitting(false);
    },
  });
  const rejectDocsFn = useMutation(rejectDocs, {
    onMutate: () => {
      setIsSubmitting(true);
    },
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      setIsSubmitting(false);
      docContext?.setSnackBarMessage({
        message: "error confirming documents",
        type: "error",
      });
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["getDocumentListingTemplate", type, refID]);
      queryClient.refetchQueries(["getDocumentsList", type, refID]);
      setError("");
      docContext?.setSnackBarMessage({
        message: "document status updated",
        type: "successs",
      });
      setIsSubmitting(false);
    },
  });

  return (
    <Fragment>
      <Divider />
      <Card>
        <CardHeader title="Confirmation"></CardHeader>
        <CardContent>
          <TextareaAutosize
            style={{ width: "50%" }}
            rowsMin={4}
            rowsMax={4}
            aria-label="maximum height"
            value={confirmMessage}
            onChange={(e) => setConfirmMessage(e.target.value)}
            onKeyDown={(e) => {
              if (!(confirmMessage.length <= maxLength || e.keyCode === 8)) {
                e.preventDefault();
              }
            }}
            disabled={isSubmitting}
          />
          <div
            style={{
              width: "50%",
              display: "flex",
            }}
          >
            {Boolean(error) ? (
              <div style={{ color: "red" }}>{error}</div>
            ) : null}
            <div style={{ flexGrow: 1 }}></div>
            <span>
              {confirmMessage.length}/{maxLength}
            </span>
          </div>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            disabled={isSubmitting}
            onClick={() => {
              if (Boolean(confirmMessage)) {
                verifyDocsFn.mutate({ type, refID, docID, confirmMessage });
              } else {
                setError("This is a required Field");
              }
            }}
          >
            Confirm
          </Button>
          <Button
            color="primary"
            disabled={isSubmitting}
            onClick={() => {
              if (Boolean(confirmMessage)) {
                rejectDocsFn.mutate({ type, refID, docID, confirmMessage });
              } else {
                setError("This is a required Field");
              }
            }}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};
