import { assignMetaData, assignedMetaData } from "./metadata";

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
