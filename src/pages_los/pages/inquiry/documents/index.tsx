import { useState } from "react";
import { AllFolders } from "./folders";
import { docMeta } from "./metaData";
import { FileUpload } from "./fileUpload";
import Box from "@material-ui/core/Box";
import { DocumentContext } from "./context";
import { FileListingWithConfirmation } from "./fileListing";
import { denormalizeTemplateData } from "./utils";
import { APISDK } from "registry/fns/sdk";
import { useQueries } from "react-query";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

export const Documents1 = () => {
  const refID = "1589";
  const docType = "I";
  const [view, setCurrentView] = useState<"folders" | "filesView" | "upload">(
    "folders"
  );
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
  let isError = result[0].isError; //|| result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0]?.error?.error_msg ?? ""} ${
    //@ts-ignore
    result[1]?.error?.error_msg ?? ""
  }`;
  let metaData: any = result[0].data;

  const transformedData = denormalizeTemplateData(metaData);

  return (
    <DocumentContext.Provider
      value={{
        setCurrentView,
      }}
    >
      {loading ? (
        "loading..."
      ) : isError ? (
        <div>{errorMsg}</div>
      ) : (
        <Box style={{ maxHeight: "80vh", overflowY: "scroll" }}>
          {view === "folders" ? (
            <AllFolders metaData={transformedData} />
          ) : view === "upload" ? (
            <FileUpload refID={refID} docType={docType} />
          ) : view === "filesView" ? (
            <FileListingWithConfirmation
              docType={docType}
              docMeta={transformedData}
            />
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
