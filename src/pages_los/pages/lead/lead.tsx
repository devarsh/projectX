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
      actionName: "leadAssign",
      actionLabel: "Lead Assign",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "detailView",
      actionLabel: "Detail View",
      multiple: false,
      rowDoubleClick: true,
    },
    {
      actionName: "verification",
      actionLabel: "Verification and Credit Score",
      multiple: false,
      rowDoubleClick: false,
      shouldExclude: (rows) => {
        let exclude = false;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].data?.product_cd === "Retail APF") {
            exclude = true;
            break;
          }
        }
        return exclude;
      },
    },
    {
      actionName: "analysis",
      actionLabel: "Ratnaafin Analysis",
      multiple: false,
      rowDoubleClick: false,
      shouldExclude: (rows) => {
        let exclude = false;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].data?.category_id === "Retail Loans") {
            exclude = true;
            break;
          }
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
      actionName: "stages",
      actionLabel: "Lead Stages",
      multiple: false,
      rowDoubleClick: false,
    },
  ];

  return <LeadGrid gridCode="TRN/003" actions={actions} />;
};
