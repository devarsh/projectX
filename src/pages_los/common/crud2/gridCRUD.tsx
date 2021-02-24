import { useContext, useRef, useState, Fragment, useEffect, FC } from "react";
import loaderGif from "assets/images/loader.gif";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { FormNew } from "./formNew";
import { FormViewEdit } from "./formViewEdit";
import { DeleteAction } from "./delete";
import { MyGridWrapper } from "./gridWrapper";
import { CRUDContext } from "./context";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import { useQuery } from "react-query";
import { MetaDataType } from "components/dyanmicForm";

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "Add",
    actionLabel: "Add Detail",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const GridCRUD: FC<{ isProductEditedRef: any; refID?: any }> = ({
  isProductEditedRef,
  refID,
}) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const dataChangedRef = useRef(false);
  const removeCache = useContext(ClearCacheContext);
  const { getGridFormMetaData } = useContext(CRUDContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(getGridFormMetaData.args)
    );
  }
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (dataChangedRef.current === true) {
      isProductEditedRef.current = true;
      gridRef.current?.refetch?.();
      dataChangedRef.current = false;
    }
  };

  useEffect(() => {
    removeCache?.addEntry(["getGridFormMetaData", wrapperKey.current]);
  }, []);

  const result = useQuery(
    ["getGridFormMetaData", wrapperKey.current],
    () => getGridFormMetaData.fn(getGridFormMetaData.args)(),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? "Unknown error occured"} `;
  let metaData = JSON.parse(JSON.stringify(result.data ?? {})) as MetaDataType;

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <Fragment>
      <MyGridWrapper
        ref={gridRef}
        key="grid"
        metaData={metaData}
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        {(currentAction?.name ?? "") === "Add" ? (
          <FormNew
            successAction={closeMyDialog}
            cancelAction={closeMyDialog}
            isProductEditedRef={dataChangedRef}
            formState={{ refID }}
          />
        ) : (currentAction?.name ?? "") === "View" ? (
          <FormViewEdit
            isProductEditedRef={dataChangedRef}
            closeDialog={closeMyDialog}
            serialNo={currentAction?.rows[0]?.id}
            formState={{ refID }}
          />
        ) : (currentAction?.name ?? "") === "Delete" ? (
          <DeleteAction
            serialNo={currentAction?.rows.map((one) => one.id)}
            closeDialog={closeMyDialog}
            isProductEditedRef={dataChangedRef}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </Fragment>
  );
  return renderResult;
};

const InvalidAction = ({ closeDialog }) => {
  useEffect(() => {
    closeDialog();
  }, []);
  return null;
};
