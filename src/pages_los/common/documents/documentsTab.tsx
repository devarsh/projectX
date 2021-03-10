import { Fragment, useState, FC, useContext, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { DocumentGridCRUD as DocGrid } from "./documentGridCRUD";
import { DOCCRUDContextProvider } from "./context";
import { useQuery } from "react-query";
import { ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";
import { useStyles } from "../style";
import * as API from "./api";

const DocAPICrud = (moduleType, productType, docCategory, refID, serialNo) => ({
  context: {
    moduleType,
    productType,
    docCategory,
    refID,
    serialNo,
  },
  uploadDocuments: {
    fn: API.uploadDocuments,
    args: { moduleType, docCategory, productType, refID, serialNo },
  },
  getDocumentsGridData: {
    fn: API.listDocuments,
    args: { moduleType, docCategory, productType, refID, serialNo },
  },
  deleteDocuments: {
    fn: API.deleteDocuments,
    args: { moduleType, docCategory, productType, refID, serialNo },
  },
  updateDocument: {
    fn: API.updateDocuments,
    args: { moduleType, docCategory, productType, refID, serialNo },
  },
  verifyDocuments: {
    fn: API.verifyDocuments,
    args: { moduleType, docCategory, productType, refID, serialNo },
  },
  getDocumentListingGridMetaData: {
    fn: API.getDocumentGridMetaData,
    args: { moduleType, docCategory, metaDataType: "grid" },
  },
  getDocumentUploadAddtionalFieldsMetaData: {
    fn: API.getDocumentGridMetaData,
    args: { moduleType, docCategory, metaDataType: "upload" },
  },
  getDocumentEditGridMetaData: {
    fn: API.getDocumentGridMetaData,
    args: { moduleType, docCategory, metaDataType: "edit" },
  },
  generateDocumentDownloadURL: {
    fn: API.generateDocumentDownloadURL,
    args: { moduleType, productType, docCategory },
  },
  previewDocument: {
    fn: API.previewDocument,
    args: { moduleType, productType, docCategory },
  },
});

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DocumentGridCRUD: FC<{
  moduleType: string;
  productType?: string;
  refID: string;
  serialNo?: string;
  onClose?: any;
}> = ({ moduleType, productType, refID, serialNo, onClose }) => {
  const removeCache = useContext(ClearCacheContext);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
  useEffect(() => {
    removeCache?.addEntry(["getDocumentCRUDTabsMetadata", moduleType, refID]);
  }, [removeCache, moduleType, refID]);
  const queryResult = useQuery(
    ["getDocumentCRUDTabsMetadata", moduleType, productType ?? "XX", refID],
    () =>
      API.getDocumentCRUDTabsMetadata({
        moduleType,
        productType,
        refID,
      })
  );
  let tabs: any[] = queryResult.data;
  if (queryResult.isSuccess) {
    if (!Array.isArray(tabs)) {
      tabs = [];
    } else {
      tabs = tabs.sort((a, b) =>
        a.sequence > b.sequence ? 1 : a.sequence < b.sequence ? -1 : 0
      );
    }
  }
  const renderResult = queryResult.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : queryResult.isError ? (
    //@ts-ignore
    queryResult.error?.error_msg ?? "unknown error occured"
  ) : (
    <Fragment>
      <Tabs value={currentTab} onChange={handleChangeTab}>
        {tabs.map((one) => (
          <Tab label={one.label} id={`${one.sequence}`} key={one.sequence} />
        ))}
        {typeof onClose === "function" ? (
          <>
            <Box flexGrow={1} />
            <Button variant="text" onClick={onClose}>
              Close
            </Button>
          </>
        ) : null}
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        {tabs.map((one) => (
          <TabPanel
            value={currentTab}
            index={`${one.sequence}`}
            key={one.sequence}
          >
            <DOCCRUDContextProvider
              key={one.docType}
              {...DocAPICrud(
                moduleType,
                productType,
                one.docType,
                refID,
                serialNo
              )}
            >
              <DocGrid />
            </DOCCRUDContextProvider>
          </TabPanel>
        ))}
      </Box>
    </Fragment>
  );
  return renderResult;
};
