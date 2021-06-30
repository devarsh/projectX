import {
  assignMetaData,
  assignedMetaData,
} from "pages_los/pages/task/metadata/grid";
import { worklogGridMetaData } from "pages_los/pages/task/worklogNew/metadata/grid";

export const getGridFormMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/009":
      return assignMetaData;
    case "TRN/008":
      return assignedMetaData;
    case "TRN/014":
      return worklogGridMetaData;
    default:
      throw { error_msg: "Invalid Product type" };
  }
};
