import {
  assignedMetaData,
  incomingMetaData,
  crossMetaData,
  unmappedMetaData,
} from "./metaData";

export const getGridMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/004": {
      return unmappedMetaData;
    }
    case "TRN/005": {
      return incomingMetaData;
    }
    case "TRN/006": {
      return assignedMetaData;
    }
    case "TRN/007": {
      return crossMetaData;
    }
    default: {
      return assignedMetaData;
    }
  }
};
