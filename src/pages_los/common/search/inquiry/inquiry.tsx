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

export const InquirySearch = ({ gridCode, actions, onAccept, value }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);

  let filter = Boolean(value)
    ? [
        {
          id: "tran_cd",
          value: {
            value: value,
            condition: "equal",
            columnName: "Inquiry CD",
          },
        },
      ]
    : [];

  useEffect(() => {
    if (currentAction?.name === "select") {
      onAccept({
        refID: currentAction?.rows[0].id,
        value: currentAction?.rows[0]?.data?.inquiry_no,
      });
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
          defaultFilter={filter}
        />
      </ServerGridContextProvider>
    </Fragment>
  );
};

export const InquirySearchWrapper = ({ onAccept, value }) => {
  return (
    <InquirySearch
      gridCode="TRN/006"
      actions={actions}
      onAccept={onAccept}
      value={value}
    />
  );
};
