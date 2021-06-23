import { LeadGrid } from "../leadGrid";
import { ActionTypes } from "components/dataTable";
// import { useContext } from "react";
// import { AuthContext } from "auth";

export const SanctionLeads = () => {
  //@ts-ignore
  //   const authCtx = useContext(AuthContext);
  //   const role = authCtx?.authState.role ?? [];
  const actions: ActionTypes[] = [
    {
      actionName: "taskAssign",
      actionLabel: "Assign Task",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "stages",
      actionLabel: "Lead Stages",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "sanction",
      actionLabel: "Sanction",
      multiple: false,
      rowDoubleClick: true,
    },
  ];

  return <LeadGrid gridCode="TRN/012" actions={actions} />;
};
