import { Fragment, useState, FC } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {
  DocumentGridCRUD as DocGrid,
  DOCCRUDContextProvider,
} from "pages_los/common/documents";
import { LOSSDK } from "registry/fns/los";
import {
  gridMetaData,
  columnsMetaData,
  gridEditMetaData,
} from "pages_los/common/documents/meta";

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  tabPanel: {
    border: "1px solid #e8e8e8",
    borderTop: "0",
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
}));

const DocAPICrud = (moduleType, docCategory, refID, srID) => ({
  uploadDocuments: {
    fn: LOSSDK.uploadDocuments,
    args: { moduleType, docCategory, refID, srID },
  },
  getDocumentsGridData: {
    fn: LOSSDK.listingDocuments,
    args: { moduleType, docCategory, refID, srID },
  },
  deleteDocuments: {
    fn: LOSSDK.deleteDocuments,
    args: { moduleType, docCategory, refID, srID },
  },
  updateDocument: {
    fn: LOSSDK.updateDocuments,
    args: { moduleType, docCategory, refID, srID },
  },
  verifyDocuments: {
    fn: LOSSDK.deleteDocuments,
    args: { moduleType, docCategory, refID, srID },
  },
});

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DocumentGridCRUD: FC<{
  moduleType: string;
  refID: string;
  srID?: string;
}> = ({ moduleType, refID, srID }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Bank" id="0" />
        <Tab label="ITR" id="1" />
        <Tab label="GST" id="2" />
        <Tab label="Others" id="3" />
      </Tabs>
      <Box py={2} className={classes.tabPanel}>
        <TabPanel value={currentTab} index="0" key={0}>
          <DOCCRUDContextProvider
            {...DocAPICrud(moduleType, "bank", refID, srID)}
          >
            <DocGrid
              gridMetaData={gridMetaData}
              gridEditMetaData={gridEditMetaData}
              uploadColumnsMetaData={columnsMetaData}
              gridProps={{ refID: "89" }}
            />
          </DOCCRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="1" key={1}>
          <DOCCRUDContextProvider
            {...DocAPICrud(moduleType, "itr", refID, srID)}
          >
            <DocGrid
              gridMetaData={gridMetaData}
              gridEditMetaData={gridEditMetaData}
              uploadColumnsMetaData={columnsMetaData}
              gridProps={{ refID: "89" }}
            />
          </DOCCRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="2" key={2}>
          <DOCCRUDContextProvider
            {...DocAPICrud(moduleType, "gst", refID, srID)}
          >
            <DocGrid
              gridMetaData={gridMetaData}
              gridEditMetaData={gridEditMetaData}
              uploadColumnsMetaData={columnsMetaData}
              gridProps={{ refID: "89" }}
            />
          </DOCCRUDContextProvider>
        </TabPanel>
        <TabPanel value={currentTab} index="3" key={3}>
          <DOCCRUDContextProvider
            {...DocAPICrud(moduleType, "other", refID, srID)}
          >
            <DocGrid
              gridMetaData={gridMetaData}
              gridEditMetaData={gridEditMetaData}
              uploadColumnsMetaData={columnsMetaData}
              gridProps={{ refID: "89" }}
            />
          </DOCCRUDContextProvider>
        </TabPanel>
      </Box>
    </Fragment>
  );
};
