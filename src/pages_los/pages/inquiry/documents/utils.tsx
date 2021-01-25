import Typography from "@material-ui/core/Typography";

export const breadcrumbPathRenderer = (path) => {
  if (Array.isArray(path)) {
    return path.map((one) => (
      <Typography color="textPrimary">{one}</Typography>
    ));
  }
  return null;
};

export const retriveFileStatus = (status: string) => {
  let currentStatus = "empty";
  if (status === "P") {
    currentStatus = "pending";
  } else if (status === "R") {
    currentStatus = "rejected";
  } else if (status === "V") {
    currentStatus = "verified";
  }
  return currentStatus;
};
