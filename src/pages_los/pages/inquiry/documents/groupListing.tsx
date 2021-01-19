import { FC } from "react";
import { GroupType } from "./types";
import { GroupItem } from "./groupItem";
import Typography from "@material-ui/core/Typography";

export const GroupListing: FC<{ oneGroup: GroupType }> = ({ oneGroup }) => {
  let renderedFolders = oneGroup.items.map((one) => (
    <GroupItem key={one.docID} {...one} />
  ));

  return (
    <div>
      <Typography variant="h6">{oneGroup.groupLabel}</Typography>
      <div style={{ display: "flex", margin: "8px", flexWrap: "wrap" }}>
        {renderedFolders}
      </div>
    </div>
  );
};

export const Groups: FC<{ metaData: GroupType[] }> = ({ metaData }) => {
  const groups = metaData.map((one) => <GroupListing oneGroup={one} />);
  return <div>{groups}</div>;
};
