import { FC, useRef, Fragment, useCallback, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { cacheWrapperKeyGen } from "cache";
import { SelectRenderOnly } from "components/common/select";
import { CRUDContext } from "pages_los/common/crud2";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { LOSSDK } from "registry/fns/los";
import { yearlyTargetTransformMetadata } from "pages_los/pages/config/userManagement/targetManagement/yearly/yearlyTargetTransformMetadata";
import { transFormData } from "pages_los/pages/config/userManagement/targetManagement/yearly/transformMetadataNew";
import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (insertFormData) => async ({
  data,
}: InsertFormDataFnType) => {
  return insertFormData(data);
};

export const FormNew: FC<{
  isDataChangedRef: any;
  successAction: any;
  cancelAction: any;
  userID: any;
}> = ({ isDataChangedRef, successAction, cancelAction, userID }) => {
  const { getFormMetaData } = useContext(CRUDContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(getFormMetaData.args)
    );
  }

  const [selectValue, setSelectValue] = useState(null);

  const result = useQuery<any>(
    ["getCurrentLeadStage", userID],
    () => LOSSDK.getUserBranchList(userID),
    { cacheTime: 0 }
  );

  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? "unknown error occured"}`;

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  let newMetaData = {} as MetaDataType;
  if (selectValue !== "") {
    newMetaData = transFormData(
      yearlyTargetTransformMetadata,
      result?.data?.others
    );
  }

  console.log(newMetaData);

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <Fragment>
      <Grid container={true} spacing={3}>
        <SelectRenderOnly
          name="branch"
          size="small"
          margin="normal"
          required
          fullWidth
          label="Select Branch"
          options={result?.data?.options}
          value={selectValue}
          autoComplete="off"
          handleChange={handleChange}
        />
      </Grid>
      {selectValue !== null ? (
        <FormWrapper
          key={`branch-${selectValue}`}
          metadata={newMetaData as MetaDataType}
          initialValues={{}}
          displayMode={"new"}
          disableGroupErrorDetection={true}
          disableGroupExclude={true}
        />
      ) : null}
    </Fragment>
  );
  return renderResult;
};
