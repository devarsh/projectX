import { FC, useContext } from "react";
import { metaData } from "./metaData";
import { SideBarNav } from "components/navigation/sideBarNavigation";
import { AuthContext } from "auth";
import "./icons";

export const MySideBar: FC<{
  handleDrawerOpen: Function;
  open: boolean;
}> = ({ handleDrawerOpen, open }) => {
  //Todo; hide config management if role not sys
  //  const auth = useContext(AuthContext);

  return (
    <SideBarNav
      metaData={metaData}
      handleDrawerOpen={handleDrawerOpen}
      drawerOpen={open}
    />
  );
};
