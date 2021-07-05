import { assignMetaData, assignedMetaData } from "./task/metadata/grid";
import { worklogGridMetaData } from "./worklog/metadata/grid";
import { coldCallingMetaData } from "./coldCalling/metadata";

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
