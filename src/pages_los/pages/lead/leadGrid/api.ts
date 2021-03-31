import { leadGridMetaData } from "./metaData";

export const getGridMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/003": {
      return leadGridMetaData;
    }
    default:
      return leadGridMetaData;
  }
};
