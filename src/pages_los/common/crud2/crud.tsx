import { useEffect, useState } from "react";
import { EditForm } from "./formEdit";
import { ViewForm } from "./formView";
import { NewForm } from "./formNew";

export const CRUD2 = ({
  refID,
  productType,
  disableDialogCloseRef,
  isProductEditedRef,
  setSnackBarMessage,
  dataAlwaysExists,
  newMetaData,
  editMetaData,
  viewMetaData,
  formState,
}) => {
  const [currentView, setCurrentView] = useState("viewMode");
  const [dataExist, setDataExist] = useState(Boolean(dataAlwaysExists));

  useEffect(() => {
    return () => {
      disableDialogCloseRef.current = false;
    };
  }, []);

  const moveToEditForm = () => {
    setCurrentView("editMode");
    disableDialogCloseRef.current = true;
  };
  const moveToViewForm = () => {
    setCurrentView("viewMode");
    disableDialogCloseRef.current = false;
  };

  return dataExist ? (
    <>
      {currentView === "viewMode" ? (
        <ViewForm
          refID={refID}
          productType={productType}
          moveToEditForm={moveToEditForm}
          metaData={viewMetaData}
        />
      ) : (
        <EditForm
          refID={refID}
          productType={productType}
          formState={formState}
          moveToViewForm={moveToViewForm}
          setSnackBarMessage={setSnackBarMessage}
          isProductEditedRef={isProductEditedRef}
          metaData={editMetaData}
        />
      )}
    </>
  ) : (
    <NewForm
      refID={refID}
      productType={productType}
      moveToViewForm={moveToViewForm}
      setSnackBarMessage={setSnackBarMessage}
      isProductEditedRef={isProductEditedRef}
      setDataExist={setDataExist}
      metaData={newMetaData}
    />
  );
};
