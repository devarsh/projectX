import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useCallback, useState } from "react";
import { RecoilRoot } from "recoil";
import { APIForm } from "./externalAPIForms";
export const ExternalAPI = () => {
  const [entity, setEntity] = useState("business");
  const [apiType, setApiType] = useState("");

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
      <ToggleButtonGroup
        size="small"
        value={entity}
        exclusive
        onChange={handleEntityChange}
      >
        <ToggleButton value="business">Legal</ToggleButton>
        <ToggleButton value="individual">Individual</ToggleButton>
      </ToggleButtonGroup>
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
      {Boolean(entity) && Boolean(apiType) ? (
        <RecoilRoot key={`${entity}-${apiType}`}>
          {/*<APIForm metaData={} />*/}
        </RecoilRoot>
      ) : null}
    </div>
  );
};
