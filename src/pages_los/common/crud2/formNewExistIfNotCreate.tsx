import { useContext, useEffect, Fragment, useState } from "react";
import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";
import { ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FormNew } from "./formNew";

export const FormNewExistsIfNotCreate = ({
  refID,
  moduleType,
  productType,
  isProductEditedRef,
  metaData,
  successAction,
}) => {
  const removeCache = useContext(ClearCacheContext);
  let result = useQuery(
    ["checkFormDataExist", moduleType, productType, refID],
    () => LOSSDK.checkFormDataExist(moduleType, productType, refID),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  useEffect(() => {
    removeCache?.addEntry([
      "checkFormDataExist",
      moduleType,
      productType,
      refID,
    ]);
  }, []);
  const loading = result.isFetching || result.isLoading;
  const isError = result.isError;
  //const errorMsg = result.error;
  const dataExist =
    result.data?.exists === "YES"
      ? true
      : result.data?.exists === "NO"
      ? false
      : false;

  useEffect(() => {
    if (dataExist) {
      if (typeof successAction === "function") {
        successAction();
      }
    }
  }, [dataExist]);

  return loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError ? (
    //@ts-ignore
    <div>{result?.error?.error_msg ?? "Unknown error occured"} </div>
  ) : !dataExist ? (
    <CreateFormConfirmation
      refID={refID}
      moduleType={moduleType}
      productType={productType}
      successAction={successAction}
      isProductEditedRef={isProductEditedRef}
      metaData={metaData}
    />
  ) : null;
};

export const CreateFormConfirmation = ({
  refID,
  moduleType,
  productType,
  successAction,
  isProductEditedRef,
  metaData,
}) => {
  const [showAsk, setShowAsk] = useState(true);
  return showAsk ? (
    <Fragment>
      <Typography variant="h6">No Data Found</Typography>
      <Button onClick={() => setShowAsk(false)}>Click Here to Add</Button>
    </Fragment>
  ) : (
    <FormNew
      refID={refID}
      moduleType={moduleType}
      productType={productType}
      isProductEditedRef={isProductEditedRef}
      cancelAction={setShowAsk}
      successAction={successAction}
      metaData={metaData}
    />
  );
};
