import { Fragment, useContext } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { FileListing } from "components/fileUpload/fileListing";
import { DocumentContext } from "./context";
import { breadcrumbPathRenderer } from "./utils";

export const FileListingWithConfirmation = ({
  type,
  refID,
  docs,
  isFetching,
}) => {
  const docContext: any = useContext(DocumentContext);
  const currentViewDocs = docs.reduce((accum, current) => {
    if (String(current.docID) === String(docContext.docID)) {
      accum.push({
        file: current.docUUID,
        name: current.docName,
        mimeType: current.docContenttype,
      });
    }
    return accum;
  }, []);

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
      {isFetching ? (
        <div>loading...</div>
      ) : (
        <FileListing
          files={currentViewDocs}
          dense={true}
          disableDelete={true}
          disablePreview={false}
          handleDeleteFile={() => {}}
          disabled={false}
        />
      )}
    </Fragment>
  );
};
