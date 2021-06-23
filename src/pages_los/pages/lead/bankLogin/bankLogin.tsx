import { useState, Fragment } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Board } from "./board";
import { data } from "./data";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextFieldForSelect } from "components/styledComponent/textfield";
import { columns } from "./data";

export const BankLogin = ({ refID, moduleType }) => {
  const [state, setState] = useState(data);
  const { enqueueSnackbar } = useSnackbar();
  const [transition, setTransition] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const confirmUpdate = () => {
    setTransition(null);
    setShowDialog(false);
  };
  const rejectUpdate = () => {
    let oldState = transition?.oldState ?? state;
    setState(oldState);
    setShowDialog(false);
    setTransition(null);
  };
  return (
    <Fragment>
      <DragDropContext
        onDragEnd={(result) => {
          if (result.destination === null) {
            enqueueSnackbar("cannot drop Bank outside", {
              variant: "info",
            });
          } else if (
            Number(result.destination?.droppableId) <=
            Number(result.source?.droppableId)
          ) {
            const srcColumnName = columns.filter(
              (one) => one.columnID === result.source?.droppableId
            );
            const descColumnName = columns.filter(
              (one) => one.columnID === result.destination?.droppableId
            );
            enqueueSnackbar(
              `cannot move Bank from ${srcColumnName[0]?.label} to ${descColumnName[0]?.label}`,
              {
                variant: "error",
              }
            );
          } else {
            let newRow;
            let oldRow;
            let newState = state.map((one) => {
              if (one.id == result.draggableId) {
                let updateRow = {
                  ...one,
                  columnID: result?.destination?.droppableId,
                };
                newRow = updateRow;
                oldRow = { ...one };
                return updateRow;
              }
              return one;
            });
            setTransition({
              oldState: state,
              newState: state,
              newRow: newRow,
              oldRow: oldRow,
            });
            setShowDialog(true);
            setState(newState);
          }
        }}
      >
        <Board data={state} />
      </DragDropContext>
      <DialogComponent
        rejectUpdate={rejectUpdate}
        confirmUpdate={confirmUpdate}
        showDialog={showDialog}
        transition={transition}
      />
    </Fragment>
  );
};

const DialogComponent = ({
  rejectUpdate,
  confirmUpdate,
  showDialog,
  transition,
}) => {
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const src = columns.filter(
    (one) => one.columnID === transition?.oldRow?.columnID
  );
  const dest = columns.filter(
    (one) => one.columnID === transition?.newRow?.columnID
  );

  const confirmWrapper = () => {
    if (!Boolean(remarks)) {
      setError("This is a required field");
    } else {
      setError("");
      setLoading(true);
      //API Calling logic
      confirmUpdate();
      setLoading(false);
    }
  };

  return (
    <Dialog open={showDialog} maxWidth="sm" fullWidth>
      <DialogTitle disableTypography={true}>
        Are you sure you want to move{" "}
        <b>
          {transition?.oldRow?.bank}-{transition?.oldRow?.branch}
        </b>{" "}
        from <b>{src[0]?.label}</b> to <b>{dest[0]?.label}.</b>
      </DialogTitle>
      <DialogContent>
        <TextFieldForSelect
          rows={3}
          type="textarea"
          multiline={true}
          InputLabelProps={{ shrink: true }}
          fullWidth={true}
          label="Remarks"
          onChange={(e) => setRemarks(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={rejectUpdate} disabled={loading}>
          Disagree
        </Button>
        <Button
          color="primary"
          onClick={confirmWrapper}
          autoFocus
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
