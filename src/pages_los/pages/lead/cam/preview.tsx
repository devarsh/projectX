import { Fragment, useContext } from "react";
import { CAMLOSWrapper } from "pages_los/pages/cam";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { CAMContext } from "./context";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";

const generateCAMRequest = (generateFn) => async () => {
  return generateFn();
};

export const PreviewCAM = ({ closeDialog, dataChangedRef }) => {
  const { context, generateCAM } = useContext(CAMContext);
  const { enqueueSnackbar } = useSnackbar();
  const { refID } = context;

  // const mutation = useMutation(
  //   () => generateCAMRequest(generateCAM.fn(generateCAM.args))(),
  //   {
  //     onError: () => null,
  //     onSuccess: (data) => {
  //       dataChangedRef.current = true;
  //       enqueueSnackbar("CAM generated successfully ", {
  //         variant: "success",
  //       });
  //     },
  //   }
  // );

  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          LeadNo
        </Typography>
        <Typography variant="h6">{refID}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Button onClick={() => null}>Generate CAM</Button>
        {typeof closeDialog === "function" ? (
          <IconButton color="primary" onClick={closeDialog}>
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
