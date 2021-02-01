import { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NewForm } from "./newForm";

export const CreateFormConfirmation = ({
  refID,
  productType,
  moveToViewForm,
  setSnackBarMessage,
  isProductEditedRef,
}) => {
  const [showAsk, setShowAsk] = useState(true);
  return showAsk ? (
    <Fragment>
      <Typography variant="h6">No {productType} Created</Typography>
      <Button onClick={() => setShowAsk(false)}>Click Here to Create</Button>
    </Fragment>
  ) : (
    <NewForm
      refID={refID}
      productType={productType}
      moveToViewForm={moveToViewForm}
      setSnackBarMessage={setSnackBarMessage}
      isProductEditedRef={isProductEditedRef}
      setShowAsk={setShowAsk}
    />
  );
};
