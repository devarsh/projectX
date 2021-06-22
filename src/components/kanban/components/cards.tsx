import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const BankCard = ({ bank, branch, columnName }) => (
  <>
    <Typography variant="h6" align="left">
      {bank}
    </Typography>
    <Typography
      variant="subtitle2"
      gutterBottom
      align="left"
      color="textSecondary"
    >
      {branch}
    </Typography>

    {columnName !== "selection" ? (
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }} />
        <Button color="secondary">Termsheet</Button>
      </div>
    ) : null}
  </>
);
