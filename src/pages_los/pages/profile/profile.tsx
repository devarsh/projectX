import { useContext, useState, Fragment } from "react";
import { useQuery } from "react-query";
import Button from "@material-ui/core/Button";
import { Alert } from "components/common/alert";
import Dialog from "@material-ui/core/Dialog";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { AuthContext } from "auth/authContext";
import { ChangePassword } from "./changePassword";
import loaderGif from "assets/images/loader.gif";
import { UserProfileMetaData } from "./metaData";
import * as API from "./api";
import { useEffect } from "react";
import { queryClient } from "cache";

export const Profile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const userData = useContext(AuthContext);
  const userID = userData?.authState?.userId;
  const queryData = useQuery<any, any, any>(["getEmployeeProfile"], () =>
    API.getEmployeeProfile({ userID })
  );
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getEmployeeProfile"]);
    };
  }, []);
  return queryData.isLoading || queryData.isFetching ? (
    <Fragment>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
    </Fragment>
  ) : queryData.isError ? (
    <Fragment>
      <Alert
        severity="error"
        errorMsg={queryData.error?.error_msg ?? "Unknown error occured"}
        errorDetail={queryData.error?.error_detail ?? ""}
      />
    </Fragment>
  ) : (
    <Fragment>
      <FormWrapper
        key="leadInquiry"
        metaData={UserProfileMetaData as MetaDataType}
        initialValues={queryData.data}
        onSubmitHandler={() => {}}
        displayMode={"view"}
        disableGroupErrorDetection={true}
        disableGroupExclude={true}
        hideDisplayModeInTitle={true}
      >
        <Button onClick={() => setShowProfile(true)}>Change Password</Button>
      </FormWrapper>
      <Dialog open={showProfile}>
        <ChangePassword onClose={() => setShowProfile(false)} />
      </Dialog>
    </Fragment>
  );
};
