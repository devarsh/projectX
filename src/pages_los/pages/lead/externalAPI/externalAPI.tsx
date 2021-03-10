import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useCallback, useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import { APIForm } from "./externalAPIForms";
import { GSTUploadMetaData } from "./metaData/gstUploadMetaData";
import { useStyles } from "./styles";

export const ExternalAPI = ({ refID, moduleType }) => {
  const [entity, setEntity] = useState("business");
  const [apiType, setApiType] = useState("");
  const classes = useStyles();
  const endSubmitRef = useRef<any>(null);
  const [data, setData] = useState<any>(null);
  const [showDocs, setShowDocs] = useState(false);

  const handleEntityChange = useCallback(
    (_, newEntity) => {
      setEntity(newEntity);
      setApiType("");
    },
    [setEntity, setApiType]
  );
  const handleApiTypeChange = useCallback(
    (_, newApiType) => setApiType(newApiType),
    [setApiType]
  );

  return (
    <div>
      <RecoilRoot key={`${entity}-${apiType}`}>
        <Grid container spacing={2} style={{ margin: "0px 16px" }}>
          <Grid item xs={4} md={4} sm={4}>
            <Typography className={classes.filterType}>Entity Type</Typography>
            <Paper elevation={0} className={classes.paper}>
              <ToggleButtonGroup
                size="small"
                value={entity}
                exclusive
                onChange={handleEntityChange}
              >
                <ToggleButton value="business">Legal</ToggleButton>
                <ToggleButton value="individual">Individual</ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Grid>
          <Grid item xs={4} md={4} sm={4}>
            <Typography className={classes.filterType}>API Type</Typography>
            <Paper elevation={0} className={classes.paper}>
              <ToggleButtonGroup
                size="small"
                value={apiType}
                exclusive
                onChange={handleApiTypeChange}
              >
                <ToggleButton value="bank">Bank</ToggleButton>
                <ToggleButton value="itr">ITR</ToggleButton>
                {entity === "business" ? (
                  <ToggleButton value="gst">GST</ToggleButton>
                ) : null}
              </ToggleButtonGroup>
            </Paper>
          </Grid>
        </Grid>
        {Boolean(entity) && Boolean(apiType) ? (
          <APIForm
            metaData={GSTUploadMetaData}
            handleSubmitFn={(data, displayData, endSubmit) => {
              endSubmitRef.current = endSubmit;
              setData(data);
              endSubmit(true);
              setShowDocs(true);
            }}
          />
        ) : null}
        {Boolean(showDocs) ? null : null}
      </RecoilRoot>
    </div>
  );
};
