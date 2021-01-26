import { useState, FC } from "react";
import { Folders } from "./folders";
import { FileUpload } from "./fileUpload";
import Box from "@material-ui/core/Box";
import { DocumentContext } from "./context";
import { FileListingWithConfirmation } from "./fileListing";
import { LOSSDK } from "registry/fns/los";
import { useQueries } from "react-query";
import { DocumentType } from "./types";

interface DocumentState {
  viewName: "folders" | "filesView" | "upload";
  docID: any;
  groupID: any;
  path: string[];
}

export const Documents: FC<DocumentType> = ({ refID, productType }) => {
  const [currentView, setCurrentView] = useState<DocumentState>({
    viewName: "folders",
    groupID: "",
    docID: "",
    path: [],
  });

  const setUploadPath = ({ path, groupID, docID }) => {
    setCurrentView({ viewName: "upload", groupID, docID, path });
  };
  const setViewPath = ({ path, groupID, docID }) => {
    setCurrentView({ viewName: "filesView", groupID, docID, path });
  };
  const setFoldersPath = () => {
    setCurrentView({ viewName: "folders", groupID: "", docID: "", path: [] });
  };

  const result = useQueries([
    {
      queryKey: ["getDocumentListingTemplate", productType, refID],
      queryFn: () => LOSSDK.getDocumentListingTemplate(productType, refID),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["getDocumentsList", productType, refID],
      queryFn: () => LOSSDK.getDocumentsList(productType, refID),
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
            <Folders metaData={metaData} key={result[0].dataUpdatedAt} />
          ) : currentView.viewName === "upload" ? (
            <FileUpload type={productType} refID={refID} />
          ) : currentView.viewName === "filesView" ? (
            <FileListingWithConfirmation
              key={`${result[0].dataUpdatedAt}-${result[1].dataUpdatedAt}`}
              type={productType}
              refID={refID}
              docs={docs}
              metaData={metaData}
            />
          ) : null}
        </Box>
      )}
    </DocumentContext.Provider>
  );
};
