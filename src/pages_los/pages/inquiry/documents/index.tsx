import { useState } from "react";
import { Groups } from "./groupListing";
import { docMeta } from "./metaData";
import { FileUpload } from "./fileUpload";
import Box from "@material-ui/core/Box";
import { DocumentContext } from "./context";
import { FileListingWithConfirmation } from "./fileListing";
import { APISDK } from "registry/fns/sdk";

export const Documents = () => {
  const refID = "1152";
  const docType = "I";
  const [view, setCurrentView] = useState<"folders" | "filesView" | "upload">(
    "folders"
  );
  APISDK.getDocumentTemplate("");

  return (
    <DocumentContext.Provider
      value={{
        setCurrentView,
      }}
    >
      <Box style={{ maxHeight: "80vh", overflowY: "scroll" }}>
        {view === "folders" ? (
          <Groups metaData={docMeta} />
        ) : view === "upload" ? (
          <FileUpload refID={refID} docType={docType} />
        ) : view === "filesView" ? (
          <FileListingWithConfirmation docType={docType} />
        ) : null}
      </Box>
    </DocumentContext.Provider>
  );
};
