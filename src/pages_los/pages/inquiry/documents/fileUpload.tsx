import { Fragment, useContext } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { FileUploadControl } from "components/fileUpload/fileControl";
import { APISDK } from "registry/fns/sdk";
import { DocumentContext } from "./context";
import { breadcrumbPathRenderer } from "./utils";
import { queryClient } from "../cache";

export const FileUpload = ({ refID }) => {
  const docContext = useContext(DocumentContext);
  const onSubmitHandler = (files, setLoading, setUserMessage, setProgress) => {
    APISDK.uploadDocuments(
      files as File[],
      docContext?.docID,
      refID,
      (precentage) => {
        setProgress(precentage);
      },
      (result) => {
        setLoading(false);
        if (result.status === "success") {
          queryClient.refetchQueries(["docTemplate", refID]);
          queryClient.refetchQueries(["docs", refID]);
          setUserMessage({
            severity: "info",
            message: result?.data?.message ?? "",
          });
          docContext?.setViewPath({
            path: docContext.path,
            docID: docContext.docID,
          });
        } else {
          setUserMessage({
            severity: "error",
            message: result?.data?.message ?? "",
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
