import {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import GridWrapper from "components/dataTableStatic";
import { useQuery } from "react-query";
import { ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen } from "./utils";

type GridWrapperType = {
  metaData: any;
  actions: ActionTypes[];
  setAction: any;
};

export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ metaData, actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const { getStaticGridData } = useContext(CRUDContext);
    const wrapperKey = useRef<any>(null);
    if (wrapperKey.current === null) {
      wrapperKey.current = cacheWrapperKeyGen(
        Object.values(getStaticGridData.args)
      );
    }

    const result = useQuery(
      ["getStaticGridData", wrapperKey.current],
      () => getStaticGridData.fn(getStaticGridData.args)(),
      {
        cacheTime: 100000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );
    useEffect(() => {
      removeCache?.addEntry(["getStaticGridData", wrapperKey.current]);
    }, []);
    useImperativeHandle(ref, () => ({
      refetch: () => result.refetch(),
    }));
    const dataUniqueKey = result.dataUpdatedAt;
    const loading = result.isLoading || result.isFetching;
    let isError = result.isError;
    //@ts-ignore
    let errorMsg = `${result.error?.error_msg ?? ""}`;
    const renderResult =
      isError === true ? (
        <span>{errorMsg}</span>
      ) : (
        <GridWrapper
          key={`staticGridData-${wrapperKey.current}-${dataUniqueKey}`}
          data={result.data ?? []}
          finalMetaData={metaData}
          setData={() => null}
          actions={actions}
          setAction={setAction}
          loading={loading}
        />
      );
    return renderResult;
  }
);
MyGridWrapper.displayName = "MyGridWrapper";
