import { useState, Fragment, useRef, useCallback, FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "pages_los/common/documents/gridWrapper";
import { Download } from "pages_los/common/documents/download";
import { PreviewWrapper } from "pages_los/common/documents/view";
import { InvalidAction } from "pages_los/common/invalidAction";
import {
  DOCCRUDContextProvider,
  DocAPICrudProviderGenerator,
} from "pages_los/common/documents/context";

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Download",
    actionLabel: "download",
    multiple: true,
  },
];

const DocumentPreview: FC<{ transformData?: any }> = ({ transformData }) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const dataChangedRef = useRef(false);
  const closeMyDialog = useCallback(() => {
    setCurrentAction(null);
    if (dataChangedRef.current === true) {
      gridRef.current?.refetch?.();
      dataChangedRef.current = false;
    }
  }, [setCurrentAction]);

  return (
    <Fragment>
      <MyGridWrapper
        ref={gridRef}
        key={`documentListing`}
        actions={actions}
        setAction={setCurrentAction}
        transformData={transformData}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={{
          style:
            currentAction?.name === "Add" || currentAction?.name === "View"
              ? { width: "100%", height: "100%" }
              : currentAction?.name === "Verify"
              ? { width: "40%" }
              : {},
        }}
      >
        {(currentAction?.name ?? "") === "Download" ? (
          <Download
            closeDialog={closeMyDialog}
            docData={currentAction?.rows.map((one) => ({
              id: one.id,
              name: one.data?.fileName,
            }))}
          />
        ) : (currentAction?.name ?? "") === "View" ? (
          <PreviewWrapper
            closeDialog={closeMyDialog}
            docUUID={currentAction?.rows[0]?.id}
            fileName={currentAction?.rows[0]?.data?.fileName}
            fileType={currentAction?.rows[0]?.data?.fileType}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </Fragment>
  );
};

export const DocumentsPreviewWrapper = ({
  isManagement,
  docCateg,
  refID,
  serialNo,
  transformData,
}) => {
  console.log(isManagement, docCateg, refID, serialNo);
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
