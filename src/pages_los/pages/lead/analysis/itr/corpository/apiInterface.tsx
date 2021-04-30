import { Fragment, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SearchBar2 } from "components/derived";
import { useMutation, useQuery } from "react-query";
import GridWrapper from "components/dataTableStatic";
import { CompanyListGrid } from "./metadata";
import { GridMetaDataType } from "components/dataTableStatic";
import { ActionTypes } from "components/dataTable";
import * as API from "../../api";
import Alert from "@material-ui/lab/Alert";

const actions: ActionTypes[] = [
  {
    actionName: "proceed",
    actionLabel: "proceed",
    multiple: false,
  },
];

interface InititateCorpositoryAPIType {
  companyID: string;
  companyName: string;
}

const InititateCorpositoryAPI = (initiateCorpositoryFn) => async ({
  companyID,
  companyName,
}: InititateCorpositoryAPIType) => {
  return initiateCorpositoryFn(companyID, companyName);
};

export const CorpositoryAPIInterface = ({
  refID,
  moduleType,
  closeDialog,
  isDataChangedRef,
}) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const searchQuery = useQuery<any, any>(
    ["corpositoryCompanySearch", searchTerm],
    () => API.corpositoryCompanySearch(moduleType, refID, searchTerm),
    {
      enabled: false,
      cacheTime: 0,
    }
  );
  const companyName = useQuery<any, any>(
    ["corpositoryGetFirmName", refID],
    () => API.corpositoryGetFirmName({ moduleType, refID })
  );
  const handleQuery = () => {
    if (!Boolean(searchTerm)) {
      setError("search term cannot be empty");
    } else {
      searchQuery.refetch();
    }
  };
  const initializeAPI = useMutation(
    InititateCorpositoryAPI(API.corpositoryInititate({ refID, moduleType })),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        closeDialog();
      },
    }
  );

  const cancelInitialization = () => {
    setCurrentAction(null);
  };
  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (companyName.isSuccess) {
      setSearchTerm(companyName.data);
    }
  }, [companyName.isSuccess]);

  return (
    <Fragment>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <Typography component="div" variant="h6">
            Corpository API Calling Interface
          </Typography>
          <Box flexGrow={1} />
          <Button onClick={closeDialog}>Close</Button>
        </Toolbar>
      </AppBar>
      <br />
      <Container>
        <SearchBar2
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Company By Name"
          onKeyDown={(e) => e.keyCode === 13 && handleQuery()}
          error={Boolean(error)}
          helperText={error}
          fullWidth
          disabled={
            searchQuery.isLoading ||
            searchQuery.isFetching ||
            searchQuery.isLoading
          }
        />
        <br />
        {searchQuery.isIdle ? null : searchQuery.isLoading ||
          searchQuery.isFetching ? (
          <span>Loading Company Data from Corpository...</span>
        ) : searchQuery.isError ? (
          <span>{searchQuery.error?.error_msg ?? "unknown error occured"}</span>
        ) : (
          <GridWrapper
            key={`corpositoryCompanyListing`}
            finalMetaData={CompanyListGrid as GridMetaDataType}
            data={searchQuery.data ?? []}
            setData={() => null}
            actions={actions}
            setAction={setCurrentAction}
          />
        )}
        <Dialog
          open={Boolean(currentAction)}
          maxWidth="sm"
          PaperProps={{ style: { width: "100%" } }}
        >
          {initializeAPI.isError ? (
            <Alert severity="error">
              {initializeAPI.error?.error_msg ?? "Unkown error occured"}
            </Alert>
          ) : null}
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Would like to proceed with API Inititalization
          </DialogContent>
          <DialogActions>
            <Button
              onClick={cancelInitialization}
              color="primary"
              autoFocus
              disabled={initializeAPI.isLoading}
            >
              No
            </Button>
            <Button
              onClick={() => {
                initializeAPI.mutate({
                  companyID: currentAction?.rows[0]?.data?.["company-id"],
                  companyName: currentAction?.rows[0]?.data?.["company-name"],
                });
              }}
              color="primary"
              disabled={initializeAPI.isLoading}
              endIcon={
                initializeAPI.isLoading ? <CircularProgress size={20} /> : null
              }
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fragment>
  );
};
