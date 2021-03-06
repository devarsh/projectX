import { useCallback, useEffect, forwardRef, useContext } from "react";
import DataGrid from "components/dataTable";
import { useQuery } from "react-query";
import { queryClient } from "cache";
import { ActionTypes } from "components/dataTable";
import {
  ServerGridContext,
  ServerGridContextProvider,
  serverGridContextGenerator,
} from "./context";

interface ServerGridType {
  gridCode: any;
  actions?: ActionTypes[];
  setAction: any;
}

export const ServerGrid = forwardRef<ServerGridType, any>(
  ({ gridCode, actions, setAction }, myRef) => {
    const {
      getGridColumnFilterData,
      getGridData,
      getGridMetaData,
    } = useContext(ServerGridContext);
    /* eslint-disable react-hooks/exhaustive-deps */
    const getGridColumnFilterDataFn = useCallback(
      getGridColumnFilterData.fn(getGridColumnFilterData.args),
      [gridCode]
    );
    /* eslint-disable react-hooks/exhaustive-deps */
    const getGridDataFn = useCallback(getGridData.fn(getGridData.args), [
      gridCode,
    ]);
    const result = useQuery(["gridMetaData", gridCode], () =>
      getGridMetaData.fn(getGridMetaData.args)()
    );
    useEffect(() => {
      return () => {
        queryClient.removeQueries(["gridMetaData", gridCode]);
      };
    }, [gridCode]);

    const loading = result.isLoading || result.isFetching;
    let isError = result.isError;
    let errorMsg =
      typeof result.error === "string"
        ? result.error
        : "cannot read error,unknown error";

    return loading ? (
      <div>loading..</div>
    ) : isError ? (
      <div>{errorMsg}</div>
    ) : (
      <DataGrid
        //@ts-ignore
        ref={myRef}
        key={gridCode}
        metaData={result.data}
        gridCode={gridCode}
        getGridData={getGridDataFn}
        getGridColumnFilterData={getGridColumnFilterDataFn}
        actions={actions}
        setAction={setAction}
      />
    );
  }
);

export const ServerGridWrapper = forwardRef<ServerGridType, any>(
  ({ gridCode, actions, setAction }, ref) => {
    return (
      <ServerGridContextProvider {...serverGridContextGenerator(gridCode)}>
        <ServerGrid
          gridCode={gridCode}
          actions={actions}
          setAction={setAction}
          ref={ref}
        />
      </ServerGridContextProvider>
    );
  }
);
