import { assignMetaData } from "pages_los/pages/task/assign/metadata/grid";
import { assignedMetaData } from "pages_los/pages/task/assigned/metadata/grid";

export const getGridFormMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/009":
      return assignMetaData;
    case "TRN/008":
      return assignedMetaData;
    default:
      throw { error_msg: "Invalid Product type" };
  }
};
