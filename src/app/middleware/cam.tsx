import { CAM } from "pages_los/pages/cam";
import logo from "assets/images/logo.svg";
import Typography from "@material-ui/core/Typography";

export const CAMParent = ({ data, date = new Date() }) => (
  <div
    style={{
      maxWidth: "230mm",
      margin: "0 auto",
      border: "2px solid #ddd",
      padding: "10px",
      background: "#fff",
    }}
  >
    <img
      src={logo}
      style={{ display: "flex", margin: "0 auto 10px auto" }}
      alt="logo"
    />
    <div style={{ display: "flex", maxWidth: "210mm", margin: "0 auto" }}>
      <Typography variant="subtitle2">
        Lead No: {data?.others?.leadNo}
      </Typography>

      <div style={{ flexGrow: 1 }} />

      <Typography variant="subtitle2">
        Generation Date: {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </Typography>
    </div>
    <CAM camData={data} />
  </div>
);
