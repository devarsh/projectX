import {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from "react";
import GridWrapper from "components/dataTableStatic";
import { useQueries } from "react-query";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { DOCCRUDContext } from "./context";
import loaderGif from "assets/images/loader.gif";
import Alert from "@material-ui/lab/Alert";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
  transformData?: any;
};

export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ actions, setAction, transformData = (data) => data }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const {
      getDocumentsGridData,
      getDocumentListingGridMetaData,
      context,
    } = useContext(DOCCRUDContext);
    const wrapperKey = useRef<any>(null);
    if (wrapperKey.current === null) {
      wrapperKey.current = cacheWrapperKeyGen(
        Object.values(getDocumentsGridData.args)
      );
    }
    useEffect(() => {
      removeCache?.addEntry([
        "getDocumentListingGridMetaData",
        context.refID,
        context.docCategory,
      ]);
      removeCache?.addEntry(["getDocumentsGridData", wrapperKey.current]);
    }, [removeCache, context]);

    useImperativeHandle(ref, () => ({
      refetch: () => result[0].refetch(),
    }));

    const result = useQueries([
      {
        queryKey: ["getDocumentsGridData", wrapperKey.current],
        queryFn: () => getDocumentsGridData.fn(getDocumentsGridData.args),
      },
      {
        queryKey: [
          "getDocumentListingGridMetaData",
          context.refID,
          context.docCategory,
        ],
        queryFn: () =>
          getDocumentListingGridMetaData.fn(
            getDocumentListingGridMetaData.args
          ),
      },
    ]);

    const renderResult =
      result[1].isLoading || result[1].isFetching ? (
        <img src={loaderGif} alt="loader" width="50px" height="50px" />
      ) : result[1].isError ? (
        <span>
          {
            //@ts-ignore
            result[1]?.error?.error_msg ?? "Unknown Error occured"
          }
        </span>
      ) : (
        <Fragment>
          {result[0].isError ? (
            <Alert severity="error">
              {
                //@ts-ignore
                result[0]?.error?.error_msg ?? "Unknown Error occured"
              }
            </Alert>
          ) : null}
          <GridWrapper
            key={`listingDocuments`}
            data={transformData(result[0].data ?? [])}
            finalMetaData={result[1].data as GridMetaDataType}
            setData={() => null}
            actions={actions}
            setAction={setAction}
            loading={result[0].isFetching || result[0].isLoading}
            refetchData={() => result[0].refetch()}
          />
        </Fragment>
      );
    return renderResult;
  }
);
MyGridWrapper.displayName = "MyGridWrapper";

//If need to coloreize Data wrap Data in this function
// const ColorizeData = (data) => {
//   if (Array.isArray(data) && data.length > 0) {
//     data = data.map((one) => {
//       if (one.status === "Pending") {
//         return { ...one, _rowColor: "rgb(232, 244, 253)" };
//       } else if (one.status === "Rejected") {
//         return { ...one, _rowColor: "rgb(253, 236, 234)" };
//       } else if (one.status === "Verified") {
//         return { ...one, _rowColor: "rgb(237, 247, 237)" };
//       } else {
//         return one;
//       }
//     });
//   }
//   return data;
// };
