import {
  assignMetaData,
  assignedMetaData,
} from "pages_los/pages/taskManagement/task/metadata/grid";
import { worklogGridMetaData } from "pages_los/pages/taskManagement/worklog/metadata/grid";
import { coldCallingMetaData } from "pages_los/pages/taskManagement/coldCalling/metadata/grid";

export const getGridFormMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/009":
      return assignMetaData;
    case "TRN/008":
      return assignedMetaData;
    case "TRN/014":
      return worklogGridMetaData;
    case "TRN/015":
      return coldCallingMetaData;
    default:
      throw { error_msg: "Invalid Product type" };
  }
};
