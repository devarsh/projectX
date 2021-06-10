import { useState, Fragment, useEffect } from "react";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { serverGridContextGenerator } from "./context";
import { ActionTypes } from "components/dataTable";

const actions: ActionTypes[] = [
  {
    actionName: "select",
    actionLabel: "Select",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const LeadSearch = ({ gridCode, actions, onAccept, value }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);

  useEffect(() => {
    if (currentAction?.name === "select") {
      onAccept(currentAction?.rows[0].id);
    }
  }, [currentAction]);
  return (
    <Fragment>
      <ServerGridContextProvider {...serverGridContextGenerator(gridCode)}>
        <ServerGrid
          gridCode={gridCode}
          actions={actions}
          setAction={setCurrentAction}
          defaultSortOrder={[{ id: "tran_cd", desc: true }]}
          defaultFilter={[
            {
              id: "tran_cd",
              value: {
                value: value,
                condition: "equal",
                columnName: "Lead CD",
              },
            },
          ]}
        />
      </ServerGridContextProvider>
    </Fragment>
  );
};

export const LeadSearchWrapper = ({ onAccept, value }) => {
  return (
    <LeadSearch
      gridCode="TRN/003"
      actions={actions}
      onAccept={onAccept}
      value={value}
    />
  );
};
