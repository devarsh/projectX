import {
  DOCCRUDContextProvider,
  DocAPICrudProviderGenerator,
} from "pages_los/common/documents/context";
import { DocumentPreview } from "./docsPreview";

export const DownloadDocuments = ({
  isManagement,
  docCateg,
  refID,
  serialNo,
  transformData,
}) => {
  return (
    <DOCCRUDContextProvider
      {...DocAPICrudProviderGenerator(
        "lead",
        isManagement ? "management" : false,
        docCateg,
        refID,
        serialNo
      )}
    >
      <DocumentPreview transformData={transformData} />
    </DOCCRUDContextProvider>
  );
};
