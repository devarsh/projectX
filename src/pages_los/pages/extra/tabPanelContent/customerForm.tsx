import React from "react";
import EmailIcon from "@material-ui/icons/Email";
import SmsIcon from "@material-ui/icons/Sms";
import PhoneIcon from "@material-ui/icons/Phone";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { TextEditor } from "../tabPanelContent/detailsTabs/editor";
import { useStyles } from "./style";

export const CustomerForm = () => {
  const classes = useStyles();
  const [action, setAction] = React.useState<string | null>("email");
  const handleAction = (
    event: React.MouseEvent<HTMLElement>,
    newAction: string | null
  ) => {
    setAction(newAction);
  };

  return (
    <>
      <div className={classes.toggleContainer}>
        <ToggleButtonGroup
          exclusive
          value={action}
          onChange={handleAction}
          aria-label="msg"
        >
          <ToggleButton value="email" aria-label="email">
            <EmailIcon />
          </ToggleButton>
          <ToggleButton value="sms" aria-label="sms">
            <SmsIcon />
          </ToggleButton>
          <ToggleButton value="phone" aria-label="phone">
            <PhoneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div>
        <TextEditor />
      </div>
    </>
  );
};
