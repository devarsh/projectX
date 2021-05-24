import { Fragment, useRef, useState, useContext } from "react";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { AuthContext } from "auth";
import { PasswordChangeMetaData } from "./metaData";
import * as API from "../api";

interface UpdatePasswordFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  userID?: any;
}

const updatePasswordFnWrapper = (updatePassword) => async ({
  data,
  userID,
}: UpdatePasswordFnType) => {
  return updatePassword({ ...data, userID });
};

export const ChangePassword = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const authCtx = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef<any>(null);

  const onSubmitHandler = (data, displayData, endSubmit) => {
    mutation.mutate({
      data,
      displayData,
      endSubmit,
      userID: authCtx?.authState?.userId,
    });
  };

  const mutation = useMutation(
    updatePasswordFnWrapper(API.changeEmployeePassword),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
        setDisabled(false);
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        enqueueSnackbar("password changed successfully", {
          variant: "success",
        });
        onClose();
        setDisabled(false);
      },
    }
  );

  return (
    <Fragment>
      <DialogContent>
        <FormWrapper
          key="passwordChange"
          metaData={PasswordChangeMetaData as MetaDataType}
          initialValues={{}}
          onSubmitHandler={onSubmitHandler}
          displayMode={"new"}
          disableGroupErrorDetection={true}
          disableGroupExclude={true}
          hideDisplayModeInTitle={true}
          formStyle={{
            background: "white",
            height: "auto",
          }}
          ref={formRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={disabled}>
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            formRef.current.handleSubmit(e);
            setDisabled(true);
          }}
          disabled={disabled}
        >
          Change Password
        </Button>
      </DialogActions>
    </Fragment>
  );
};
