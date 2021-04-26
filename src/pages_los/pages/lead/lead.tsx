import { LeadGrid } from "./leadGrid";
import { ActionTypes } from "components/dataTable";
import { useContext } from "react";
import { AuthContext } from "auth";

export const Lead = () => {
  //@ts-ignore
  const authCtx = useContext(AuthContext);
  const role = authCtx?.authState.role ?? [];
  const actions: ActionTypes[] = [
    {
      actionName: "detailView",
      actionLabel: "Detail View",
      multiple: false,
      rowDoubleClick: true,
    },
    {
      actionName: "cam",
      actionLabel: "CAM",
      multiple: false,
      rowDoubleClick: false,
      shouldExclude: (rows) => {
        let exclude = false;
        for (let i = 0; i < rows.length; i++) {
          let currentBranchCode = `${rows[i].data?.branch_cd}`.trim();
          if (Array.isArray(role) && role.length > 0) {
            let currentRole = role.find(
              (one) => one.branchCode === currentBranchCode
            );
            if (currentRole !== undefined) {
              //role 3 & 4 is BDM & BDE
              if ([3, 4].indexOf(currentRole?.roleTranCode) >= 0) {
                exclude = true;
                break;
              }
            }
          }
        }
        return exclude;
      },
    },
    {
      actionName: "analysis",
      actionLabel: "Analysis",
      multiple: false,
      rowDoubleClick: false,
      shouldExclude: (rows) => {
        let exclude = false;
        for (let i = 0; i < rows.length; i++) {
          let currentBranchCode = `${rows[i].data?.branch_cd}`.trim();
          if (Array.isArray(role) && role.length > 0) {
            let currentRole = role.find(
              (one) => one.branchCode === currentBranchCode
            );
            if (currentRole !== undefined) {
              //role 3 & 4 is BDM & BDE
              if ([3, 4].indexOf(currentRole?.roleTranCode) >= 0) {
                exclude = true;
                break;
              }
            }
          }
        }
        return exclude;
      },
    },
    {
      actionName: "verification",
      actionLabel: "Verification API",
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
      actionName: "leadAssign",
      actionLabel: "Lead Assign",
      multiple: false,
      rowDoubleClick: false,
    },
  ];

  return <LeadGrid gridCode="TRN/003" actions={actions} />;
};
