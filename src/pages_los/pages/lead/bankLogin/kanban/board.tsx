import { Fragment, useState, useRef } from "react";
import { Column } from "./column";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { SearchBar } from "components/derived/search";
import { BoardContainer } from "./components";
import { Filter } from "./filter";
import { ActionPicker } from "./actionPicker";

export const Board = ({
  refID,
  data,
  columns,
  filterBy,
  splitItemsBy,
  itemsPriorityKey,
  itemsKey,
  disabled,
  query,
}) => {
  const [search, setSearch] = useState("");
  const [currentAction, setCurrentAction] = useState<any>(null);
  const dataChangedRef = useRef(false);
  const closeDialog = () => {
    if (dataChangedRef.current === true) {
      query?.refetch?.();
      dataChangedRef.current = false;
    }
    setCurrentAction(null);
  };

  return (
    <Fragment>
      <Toolbar
        variant="dense"
        disableGutters
        style={{ marginLeft: "8px", marginRight: "8px" }}
      >
        <Typography component="div" variant="h6">
          Bank Login
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton
          aria-label="refresh"
          aria-controls="button"
          aria-haspopup="false"
          onClick={() => query?.refetch?.()}
        >
          <RefreshIcon />
        </IconButton>
        <SearchBar
          margin={"none"}
          placeholder="Search Bank"
          style={{ marginLeft: "8px", marginRight: "8px" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginRight: "16px" }}
          onClick={() =>
            setCurrentAction({
              name: "addBank",
              refID: refID,
            })
          }
        >
          Add Bank
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            setCurrentAction({
              name: "sanction",
              refID: refID,
            })
          }
        >
          Sancation
        </Button>
      </Toolbar>
      <BoardContainer disabled={disabled}>
        <Filter
          data={data}
          filterValue={search}
          columns={columns}
          filterBy={filterBy}
          splitItemsBy={splitItemsBy}
          itemsPriorityKey={itemsPriorityKey}
        >
          {(filteredData) => (
            <>
              {filteredData.map((one) => {
                return (
                  <Column
                    key={one.columnID}
                    itemsKey={itemsKey}
                    refID={refID}
                    query={query}
                    {...one}
                  />
                );
              })}
            </>
          )}
        </Filter>
      </BoardContainer>
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="md"
        fullWidth={true}
        PaperProps={{ style: { height: "70%" } }}
      >
        <ActionPicker
          currentAction={currentAction}
          closeDialog={closeDialog}
          dataChangedRef={dataChangedRef}
        />
      </Dialog>
    </Fragment>
  );
};
