import { Fragment, useContext, useEffect, FC } from "react";
import { ClearCacheContext } from "cache";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import GridWrapper from "components/dataTableStatic";
import { useQueries } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { GridMetaDataType } from "components/dataTable/types";
import * as API from "./api";
import { Button } from "@material-ui/core";

export const DetailsTabView: FC<{
  moduleType: any;
  closeDialog?: any;
  disableCache?: boolean;
  taskID: string;
}> = ({ moduleType, closeDialog, taskID, disableCache }) => {
  const removeCache = useContext(ClearCacheContext);

  const result = useQueries([
    disableCache
      ? {
          queryKey: ["getHistoryTaskFormData", moduleType, taskID],
          queryFn: () => API.getTaskHistory({ moduleType, taskID }),
          cacheTime: 0,
        }
      : {
          queryKey: ["getTaskFormData", moduleType, taskID],
          queryFn: () => API.getTaskHistory({ moduleType, taskID }),
        },
    {
      queryKey: ["getFormMetaData", "view"],
      queryFn: () => API.getHistoryGridFormMetaData,
    },
  ]);

  useEffect(() => {
    removeCache?.addEntry(["getHistoryTaskFormData", moduleType, taskID]);
    removeCache?.addEntry(["getTaskHistoryFormMetaData"]);
  }, [removeCache, taskID]);

  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[0].isFetching ||
    result[1].isFetching;
  let isError = result[0].isError || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg} ${result[1].error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  const renderResult = loading ? (
    <>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : isError === true ? (
    <>
      <span>{errorMsg}</span>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : (
    <Fragment>
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <IconButton onClick={closeDialog}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </div>
      <DialogContent>
        <GridWrapper
          key={`externalAPIGridStatusListing`}
          finalMetaData={result[1].data as GridMetaDataType}
          data={result[0].data ?? []}
          setData={() => null}
          loading={loading}
        />
      </DialogContent>
    </Fragment>
  );
  return renderResult;
};
