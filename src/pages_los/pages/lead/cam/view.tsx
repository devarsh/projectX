import { useContext, Fragment } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { CAMContext } from "./context";

export const ViewCAM = ({ serialNo, closeDialog }) => {
  const { viewCAM, context } = useContext(CAMContext);
  const { refID } = context;
  const url = viewCAM.fn(viewCAM.args)({ serialNo: serialNo });

  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          LeadNo
        </Typography>
        <Typography variant="h6">{refID}</Typography>
        <Typography variant="h6" color="textSecondary">
          SerialNo
        </Typography>
        <Typography variant="h6">{serialNo}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        {typeof closeDialog === "function" ? (
          <IconButton color="primary" onClick={closeDialog}>
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        <iframe
          src={`${url}`}
          title="Document View"
          style={{ height: "100%", width: "100%" }}
          aria-label="File Preview"
        />
      </DialogContent>
    </Fragment>
  );
};
