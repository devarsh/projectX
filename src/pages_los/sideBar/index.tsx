import { FC } from "react";
import { metaData } from "./metaData";
import { SideBar } from "./renderer";
import "./icons";
import { useStyles } from "./style";
export const MySideBar: FC<{
  handleDrawerOpen: Function;
  open: boolean;
}> = ({ handleDrawerOpen, open }) => {
  const classes = useStyles();
  return (
    <SideBar
      metaData={metaData}
      classes={classes}
      handleDrawerOpen={handleDrawerOpen}
      drawerOpen={open}
    />
  );
};
