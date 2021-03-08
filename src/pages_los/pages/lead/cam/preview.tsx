import { Fragment, useContext } from "react";
import { CAMLOSWrapper } from "pages_los/pages/cam";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import Close from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CAMContext } from "./context";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";

const generateCAMRequest = (generateFn) => () => {
  return generateFn();
};

export const PreviewCAM = ({ closeDialog, dataChangedRef }) => {
  const { context, generateCAM } = useContext(CAMContext);
  const { enqueueSnackbar } = useSnackbar();
  const { refID } = context;

  const mutation = useMutation<any, any>(
    generateCAMRequest(generateCAM.fn(generateCAM.args)),
    {
      onError: () => {},
      onSuccess: (data) => {
        dataChangedRef.current = true;
        enqueueSnackbar("CAM generated successfully ", {
          variant: "success",
        });
      },
    }
  );

  return (
    <Fragment>
      {mutation.isError ? (
        <Alert severity="error">
          {mutation.error?.error_msg ?? "Unknown error occured"}
        </Alert>
      ) : null}
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          LeadNo
        </Typography>
        <Typography variant="h6">{refID}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Button
          onClick={() => mutation.mutate()}
          disabled={mutation.isLoading}
          endIcon={mutation.isLoading ? <CircularProgress size={20} /> : null}
        >
          Generate CAM
        </Button>
        {typeof closeDialog === "function" ? (
          <IconButton
            color="primary"
            onClick={closeDialog}
            disabled={mutation.isLoading}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        <CAMLOSWrapper refID={refID} />
      </DialogContent>
    </Fragment>
  );
};
