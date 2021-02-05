import { useContext, useEffect } from "react";
import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";
import { ClearCacheContext } from "cache";
import { CreateFormConfirmation } from "./createFormConfirmation";
import loaderGif from "assets/images/loader.gif";

export const NewFormChecker = ({
  refID,
  productType,
  moveToViewForm,
  setSnackBarMessage,
  isProductEditedRef,
  setDataExist,
}) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    removeCache?.addEntry(["checkDataExist", productType, refID]);
  }, []);
  let result = useQuery(
    ["checkDataExist", productType, refID],
    () => LOSSDK.checkDataExist(productType, refID),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
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
      setDataExist(true);
    }
  }, [dataExist]);

  return loading ? (
    <img src={loaderGif} alt="loader" />
  ) : isError ? (
    <div>{"error occured"}</div>
  ) : dataExist ? null : (
    <CreateFormConfirmation
      key={refID}
      refID={refID}
      productType={productType}
      moveToViewForm={moveToViewForm}
      setSnackBarMessage={setSnackBarMessage}
      isProductEditedRef={isProductEditedRef}
    />
  );
};
