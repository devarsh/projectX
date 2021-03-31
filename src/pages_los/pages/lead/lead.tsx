import { LeadGrid } from "./leadGrid";
import { ActionTypes } from "components/dataTable";

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
  },
  {
    actionName: "external",
    actionLabel: "External API",
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
    actionName: "leadInquiry",
    actionLabel: "Lead Inquiry",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const Lead = () => <LeadGrid gridCode="TRN/003" actions={actions} />;
