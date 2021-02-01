import { Fragment, useContext } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { FileUploadControl } from "components/fileUpload/fileControl";
import { LOSSDK } from "registry/fns/los";
import { DocumentContext } from "./context";
import { breadcrumbPathRenderer } from "./utils";
import { queryClient } from "cache";

export const FileUpload = ({ type, refID }) => {
  const docContext = useContext(DocumentContext);
  const onSubmitHandler = (files, setLoading, setUserMessage, setProgress) => {
    LOSSDK.uploadDocuments(
      type,
      files as File[],
      docContext?.docID,
      refID,
      (precentage) => {
        setProgress(precentage);
      },
      (result) => {
        setLoading(false);
        if (result.status === "success") {
          queryClient.refetchQueries([
            "getDocumentListingTemplate",
            type,
            refID,
          ]);
          queryClient.refetchQueries(["getDocumentsList", type, refID]);
          docContext?.setSnackBarMessage({
            message: result?.data?.message ?? "documents uploaded successfully",
            type: "info",
          });
          docContext?.setViewPath({
            groupID: docContext.groupID,
            docID: docContext.docID,
            path: docContext.path,
          });
        } else {
          docContext?.setSnackBarMessage({
            message: result?.data?.message ?? "",
            type: "error",
          });
        }
      }
    );
  };

  return (
    <Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            docContext?.setFoldersPath();
          }}
        >
          Documents
        </Link>
        {breadcrumbPathRenderer(docContext?.path)}
      </Breadcrumbs>
      <FileUploadControl
        allowedExtensions={["pdf", "jpg", "jpeg", "png"]}
        maxAllowedSize={1024 * 1024 * 3}
        maxAllowedFiles={10}
        onSubmitHandler={onSubmitHandler}
      />
    </Fragment>
  );
};
