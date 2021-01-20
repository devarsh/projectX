import { useState } from "react";
import { AllFolders } from "./folders";
import { FileUpload } from "./fileUpload";
import Box from "@material-ui/core/Box";
import { DocumentContext } from "./context";
import { FileListingWithConfirmation } from "./fileListing";
import { APISDK } from "registry/fns/sdk";
import { useQueries } from "react-query";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

export const Documents1 = () => {
  const refID = "1590";
  const docType = "12";
  const [currentView, setCurrentView] = useState<{
    viewName: "folders" | "filesView" | "upload";
    path: [];
  }>({ viewName: "folders", path: [] });

  const setUploadPath = (path) => {
    setCurrentView({ viewName: "upload", path });
  };
  const setViewPath = (path) => {
    setCurrentView({ viewName: "upload", path });
  };
  const setFoldersPath = () => {
    setCurrentView({ viewName: "folders", path: [] });
  };

  const result = useQueries([
    {
      queryKey: ["docTemplate", refID],
      queryFn: () => APISDK.getDocumentTemplate(refID),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["docs", refID],
      queryFn: () => APISDK.getDocuments(refID),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  ]);

  const loading = result[0].isLoading || result[1].isLoading;
  let isError = result[0].isError; // || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0]?.error?.error_msg ?? ""} ${
    //@ts-ignore
    result[1]?.error?.error_msg ?? ""
  }`;
  let metaData: any = result[0].data;

  return (
    <DocumentContext.Provider
      value={{
        setUploadPath,
        setViewPath,
        setFoldersPath,
      }}
    >
      {loading ? (
        "loading..."
      ) : isError ? (
        <div>{errorMsg}</div>
      ) : (
        <Box style={{ maxHeight: "80vh", overflowY: "scroll" }}>
          {currentView.viewName === "folders" ? (
            <AllFolders metaData={metaData} />
          ) : currentView.viewName === "upload" ? (
            <FileUpload refID={refID} docType={docType} />
          ) : currentView.viewName === "filesView" ? (
            <FileListingWithConfirmation docType={docType} docMeta={metaData} />
          ) : null}
        </Box>
      )}
    </DocumentContext.Provider>
  );
};

export const Documents = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Documents1 />
    </QueryClientProvider>
  );
};
