import Typography from "@material-ui/core/Typography";

export const breadcrumbPathRenderer = (path) => {
  if (Array.isArray(path)) {
    return path.map((one) => (
      <Typography color="textPrimary">{one}</Typography>
    ));
  }
  return null;
};
