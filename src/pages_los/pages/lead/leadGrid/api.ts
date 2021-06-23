import {
  leadGridMetaData,
  leadBankLoginMetaData,
  leadMandateMetaData,
  leadSanctionMetaData,
  leadDisbursementMetaData,
} from "./metaData";

export const getGridMetaData = ({ gridCode }) => async () => {
  switch (gridCode) {
    case "TRN/003": {
      return leadGridMetaData;
    }
    case "TRN/010": {
      return leadMandateMetaData;
    }
    case "TRN/011": {
      return leadBankLoginMetaData;
    }
    case "TRN/012": {
      return leadSanctionMetaData;
    }
    case "TRN/013": {
      return leadDisbursementMetaData;
    }
    default:
      return leadGridMetaData;
  }
};
