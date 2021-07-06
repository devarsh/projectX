import { Fragment, FC, useEffect } from "react";
import { queryClient } from "cache";
import { useQuery } from "react-query";
import { GridMetaDataType } from "components/dataTable/types";
import GridWrapper from "components/dataTableStatic";
import * as API from "./api";
import { Alert } from "components/common/alert";
import { historyGridMetaData } from "./metaData";
import { HeaderDetails } from "./headerDetails";

export const HistoryGrid: FC<{
  moduleType: any;
  closeDialog?: any;
  taskID: string;
  rowData: any;
}> = ({ moduleType, closeDialog, taskID, rowData }) => {
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getTaskHistoryGridData", moduleType, taskID]);
    };
  }, []);
  const result = useQuery<any, any>(
    ["getTaskHistoryGridData", moduleType, taskID],
    () => API.getTaskHistoryGridData({ moduleType, taskID })
  );

  const renderResult = (
    <Fragment>
      <HeaderDetails handleDialogClose={closeDialog} rowData={rowData} />

      {result.isError ? (
        <Alert
          severity="error"
          errorMsg={result?.error?.error_msg}
          errorDetail={result?.error?.error_dtl ?? ""}
        />
      ) : null}
      <GridWrapper
        key={`externalAPIGridStatusListing`}
        finalMetaData={historyGridMetaData as GridMetaDataType}
        data={result.data ?? []}
        setData={() => null}
        loading={result.isLoading || result.isFetching}
      />
    </Fragment>
  );

  return renderResult;
};
