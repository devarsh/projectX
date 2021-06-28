import { useState, Fragment, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Board } from "./board";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import { TextFieldForSelect } from "components/styledComponent/textfield";
import { useMutation, useQuery } from "react-query";
import { getCorrespondingValue } from "./utils";
import { Alert } from "components/common/alert";
import { getBankLoginData, updateBankCategory } from "../api";

export const Kanban = ({
  refID,
  columns,
  filterBy,
  splitItemsBy,
  itemsPriorityKey,
  itemsKey,
}) => {
  const [state, setState] = useState<any>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [transition, setTransition] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const query = useQuery(
    ["getBankLoginData", refID],
    () => getBankLoginData({ refID }),
    {
      onSuccess: (data) => {
        setState(data);
      },
    }
  );
  useEffect(() => {
    if (query.isSuccess) {
      setState(query.data);
    }
  }, []);

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
              if (one?.[itemsKey] == result.draggableId) {
                let updateRow = {
                  ...one,
                  [splitItemsBy]: getCorrespondingValue(
                    columns,
                    "columnID",
                    result?.destination?.droppableId,
                    "columnInItem"
                  ),
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
        {query?.isLoading || query?.isFetching ? <LinearProgress /> : null}
        <Board
          data={state}
          columns={columns}
          filterBy={filterBy}
          splitItemsBy={splitItemsBy}
          itemsPriorityKey={itemsPriorityKey}
          itemsKey={itemsKey}
          refID={refID}
          disabled={query?.isLoading || query?.isFetching}
          query={query}
        />
      </DragDropContext>
      <DialogComponent
        rejectUpdate={rejectUpdate}
        confirmUpdate={confirmUpdate}
        showDialog={showDialog}
        transition={transition}
        columns={columns}
        refID={refID}
        splitItemsBy={splitItemsBy}
        itemsKey={itemsKey}
      />
    </Fragment>
  );
};

interface updateBankCategoryType {
  refID?: string;
  branchID?: string;
  statusCode?: string;
  remarks?: string;
}

const UpdateBankCategoryWrapper = (updateBankCategoryFn) => async ({
  refID,
  branchID,
  statusCode,
  remarks,
}: updateBankCategoryType) => {
  return updateBankCategoryFn({ refID, branchID, statusCode, remarks });
};

const DialogComponent = ({
  refID,
  rejectUpdate,
  confirmUpdate,
  showDialog,
  transition,
  columns,
  splitItemsBy,
  itemsKey,
}) => {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation(UpdateBankCategoryWrapper(updateBankCategory), {
    onMutate: () => {
      setError("");
    },
    onError: (error: any) => {},
    onSuccess: (data) => {
      confirmUpdate();
    },
  });

  const src = columns.filter(
    (one) =>
      one.columnID ===
      getCorrespondingValue(
        columns,
        "columnInItem",
        transition?.oldRow?.statusCode,
        "columnID"
      )
  );
  const dest = columns.filter(
    (one) =>
      one.columnID ===
      getCorrespondingValue(
        columns,
        "columnInItem",
        transition?.newRow?.statusCode,
        "columnID"
      )
  );

  return (
    <Dialog open={showDialog} maxWidth="sm" fullWidth>
      {mutation?.isError ? (
        <Alert
          severity="error"
          errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
          errorDetail={mutation.error?.error_detail ?? ""}
        />
      ) : null}
      <DialogTitle disableTypography={true}>
        Are you sure you want to move{" "}
        <b>
          {transition?.oldRow?.bankName}-{transition?.oldRow?.branchName}
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
          value={remarks}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={rejectUpdate}
          disabled={mutation?.isLoading}
        >
          Disagree
        </Button>
        <Button
          color="primary"
          onClick={() =>
            mutation.mutate({
              refID: refID,
              branchID: transition?.newRow?.[itemsKey],
              statusCode: transition?.newRow?.[splitItemsBy],
              remarks: remarks,
            })
          }
          autoFocus
          disabled={mutation?.isLoading}
          endIcon={mutation?.isLoading ? <CircularProgress size={20} /> : null}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
