import { Fragment, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import Close from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CAMContext } from "./context";
import { HeaderDetails } from "./headerDetails";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { CAM } from "pages_los/pages/cam";
import * as CAMAPI from "pages_los/pages/cam/api";
import loaderGif from "assets/images/loader.gif";

const generateCAMRequest = (generateFn) => (data) => {
  return generateFn(data);
};

export const PreviewCAM = ({ closeDialog, dataChangedRef }) => {
  const { context, generateCAM } = useContext(CAMContext);
  const { enqueueSnackbar } = useSnackbar();
  const [amountIn, setAmountIn] = useState(1);
  const { refID } = context;

  const result = useQuery<any, any, any>(["getCAMData", refID], () =>
    CAMAPI.getCAMData({ refID })
  );

  const mutation = useMutation<any, any>(
    generateCAMRequest(generateCAM.fn(generateCAM.args)),
    {
      onError: () => {},
      onSuccess: (data) => {
        dataChangedRef.current = true;
        enqueueSnackbar("CAM generated successfully ", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );
  let errorMsg = `${result.error?.error_msg} ${mutation.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  return result.isLoading || result.isFetching ? (
    <Fragment>
      <div style={{ display: "flex" }}>
        <img src={loaderGif} height="50px" width="50px" alt="loader" />
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </div>
    </Fragment>
  ) : result.isError || mutation.isError ? (
    <Alert severity="error" onClose={closeDialog}>
      {errorMsg}
    </Alert>
  ) : (
    <Fragment>
      <DialogActions
        style={{ display: "flex", padding: "8px 24px" }}
        className="hideForPrint"
      >
        <HeaderDetails
          rowData={result?.data?.others ?? ""}
          setAmountIn={setAmountIn}
          amountIn={amountIn}
        />

        <div style={{ flexGrow: 1 }}></div>
        <Button
          //@ts-ignore
          onClick={() => mutation.mutate(result.data, amountIn)}
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
        <CAM camData={result.data} amountIn={amountIn} />
      </DialogContent>
    </Fragment>
  );
};
