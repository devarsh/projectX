import { Fragment, useContext } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { FileUploadControl } from "components/fileUpload/fileControl";
import { APISDK } from "registry/fns/sdk";
import { DocumentContext } from "./context";

export const FileUpload = ({ docType, refID }) => {
  const docContext: any = useContext(DocumentContext);
  const onSubmitHandler = (files, setLoading, setUserMessage, setProgress) => {
    APISDK.uploadDocuments(
      files as File[],
      docType,
      refID,
      (precentage) => {
        setProgress(precentage);
      },
      (result) => {
        setLoading(false);
        if (result.status === "success") {
          setUserMessage({
            severity: "info",
            message: result?.data?.message ?? "",
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
            docContext.setCurrentView("folders");
          }}
        >
          Documents
        </Link>
        <Typography color="textPrimary">PanCard</Typography>
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
