import { FC, Fragment, useState } from "react";
import Alert, { AlertProps } from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

interface MyAlertProps {
  errorMsg: string;
  errorDetail?: string;
}

export const MyAlert: FC<MyAlertProps & AlertProps> = ({
  errorMsg,
  errorDetail,
  ...others
}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Alert
      {...others}
      action={
        Boolean(errorDetail) ? (
          <Button onClick={() => setShowMore((more) => !more)}>
            {showMore ? "Show Less" : "Show More"}
          </Button>
        ) : null
      }
    >
      <span>{errorMsg}</span>
      {showMore ? (
        <Fragment>
          <br />
          <hr />
          <span>{errorDetail}</span>
        </Fragment>
      ) : null}
    </Alert>
  );
};
