import { FC, useContext, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useQuery } from "react-query";
import {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";
import { ClearCacheContext } from "cache";

export const ViewForm: FC<{
  refID: string;
  productType: string;
  moveToEditForm: any;
  metaData: MetaDataType;
}> = ({ refID, productType, moveToEditForm, metaData }) => {
  const removeCache = useContext(ClearCacheContext);
  const result = useQuery(
    ["getViewData", productType, refID],
    () => LOSSDK.getLeadDataForView(productType, refID),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    }
  );
  useEffect(() => {
    removeCache?.addEntry(["getViewData", productType, refID]);
  }, []);
  const dataUniqueKey = result.dataUpdatedAt;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? ""}`;
  let formDisplayValues = result.data;
  // if (loading === false && isError === false) {
  //   //isError = !isMetaDataValid(metaData);
  //   if (isError === true) {
  //     errorMsg = "Error loading form";
  //   }
  // }

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <ViewFormWrapper
      key={`${productType}-${refID}-${dataUniqueKey}-viewMode`}
      metaData={metaData as MetaDataType}
      //@ts-ignore
      formDisplayValues={formDisplayValues}
      onAccept={moveToEditForm}
    >
      {({ onAccept }) => (
        <Box width={1} display="flex" justifyContent="flex-end">
          <Button type="button" onClick={onAccept}>
            Edit Data
          </Button>
        </Box>
      )}
    </ViewFormWrapper>
  );
  return renderResult;
};
