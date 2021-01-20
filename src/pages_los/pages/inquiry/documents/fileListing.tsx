import { Fragment, useContext } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { FileListing } from "components/fileUpload/fileListing";
import { DocumentContext } from "./context";

export const FileListingWithConfirmation = ({ docType, docMeta }) => {
  const docContext: any = useContext(DocumentContext);
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
      <FileListing
        files={[
          {
            file:
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            name: "Devarsh",
            mimeType: "application/pdf",
            size: 3242334,
          },
        ]}
        dense={true}
        disableDelete={true}
        disablePreview={false}
        handleDeleteFile={() => {}}
        disabled={false}
      />
    </Fragment>
  );
};
