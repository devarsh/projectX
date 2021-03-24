import {
  assignedMetaData,
  incomingMetaData,
  crossMetaData,
  unmappedMetaData,
} from "./metaData";

export const getGridMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/001": {
      return assignedMetaData;
    }
    default: {
      return assignedMetaData;
    }
  }
};
