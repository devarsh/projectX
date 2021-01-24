import { useState } from "react";
import { Folders } from "./folders";
import { FileUpload } from "./fileUpload";
import Box from "@material-ui/core/Box";
import { DocumentContext } from "./context";
import { FileListingWithConfirmation } from "./fileListing";
import { LOSSDK } from "registry/fns/los";
import { useQueries } from "react-query";

export const Documents = () => {
  const refID = "1590";
  const type = "inquiry";
  const [currentView, setCurrentView] = useState<{
    viewName: "folders" | "filesView" | "upload";
    docID: any;
    path: string[];
  }>({ viewName: "folders", path: [], docID: "" });

  const setUploadPath = ({ path, docID }) => {
    setCurrentView({ viewName: "upload", docID, path });
  };
  const setViewPath = ({ path, docID }) => {
    setCurrentView({ viewName: "filesView", docID, path });
  };
  const setFoldersPath = () => {
    setCurrentView({ viewName: "folders", path: [], docID: "" });
  };

  const result = useQueries([
    {
      queryKey: ["getDocumentListingTemplate", type, refID],
      queryFn: () => LOSSDK.getDocumentListingTemplate(type, refID),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["getDocumentsList", type, refID],
      queryFn: () => LOSSDK.getDocumentsList(type, refID),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  ]);

  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[0].isFetching ||
    result[1].isFetching;
  let isError = result[0].isError || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0]?.error?.error_msg ?? ""} ${
    //@ts-ignore
    result[1]?.error?.error_msg ?? ""
  }`;
  let metaData: any = result[0].data;
  let docs: any = result[1].data;

  return (
    <DocumentContext.Provider
      value={{
        setUploadPath,
        setViewPath,
        setFoldersPath,
        ...currentView,
      }}
    >
      {loading ? (
        "loading..."
      ) : isError ? (
        <div>{errorMsg}</div>
      ) : (
        <Box style={{ maxHeight: "80vh", overflowY: "scroll" }}>
          {currentView.viewName === "folders" ? (
            <Folders
              key={result[0].dataUpdatedAt}
              metaData={metaData}
              isFetching={result[0].isFetching}
            />
          ) : currentView.viewName === "upload" ? (
            <FileUpload type={type} refID={refID} />
          ) : currentView.viewName === "filesView" ? (
            <FileListingWithConfirmation
              type={type}
              key={result[0].dataUpdatedAt}
              refID={refID}
              docs={docs}
              isFetching={result[0].isFetching}
            />
          ) : null}
        </Box>
      )}
    </DocumentContext.Provider>
  );
};
