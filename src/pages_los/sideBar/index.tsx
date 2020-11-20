import { FC } from "react";
import { metaData } from "./metaData";
import { SideBar } from "./renderer";
import "./icons";
import { useStyles, SideBarNameProps, SideBarStyleProps } from "./style";
export const MySideBar: FC<{
  handleDrawerOpen: Function;
  open: boolean;
}> = ({ handleDrawerOpen, open }) => {
  const classes: SideBarNameProps = useStyles({} as SideBarStyleProps);
  return (
    <SideBar
      metaData={metaData}
      classes={classes}
      handleDrawerOpen={handleDrawerOpen}
      drawerOpen={open}
    />
  );
};
