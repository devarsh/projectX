import { FC } from "react";
import { useState } from "react";
import { NavBarType, NavItemType } from "pages_crm/header/types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SideBarNameProps } from "./style";

export const SideBar: FC<{
  metaData: NavBarType;
  classes: SideBarNameProps;
  handleDrawerOpen: Function;
  drawerOpen: boolean;
}> = ({ metaData, classes, handleDrawerOpen, drawerOpen }) => {
  let result: JSX.Element[] | null = null;
  if (Array.isArray(metaData.navItems)) {
    result = metaData.navItems.map((one) => {
      if (Array.isArray(one.children)) {
        return (
          <NestedListItem
            key={one.label}
            item={one}
            classes={classes}
            level={0}
            handleDrawerOpen={handleDrawerOpen}
            drawerOpen={drawerOpen}
          />
        );
      } else {
        return (
          <SingleListItem
            key={one.label}
            item={one}
            classes={classes}
            level={0}
          />
        );
      }
    });
  }
  return (
    <List component="nav" disablePadding>
      {result}
    </List>
  );
};

const SingleListItem: FC<{
  item: NavItemType;
  classes: SideBarNameProps;
  level: number;
}> = ({ item, classes }) => {
  const icon = item.icon ? (
    <ListItemIcon>
      <FontAwesomeIcon icon={["fas", item.icon]} />
    </ListItemIcon>
  ) : null;

  return (
    <ListItem button disableGutters>
      {icon}
      <ListItemText primary={item.label}></ListItemText>
    </ListItem>
  );
};

const NestedListItem: FC<{
  item: NavItemType;
  classes: SideBarNameProps;
  level: number;
  handleDrawerOpen: Function;
  drawerOpen: boolean;
}> = ({ item, classes, level, handleDrawerOpen, drawerOpen }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (!drawerOpen) {
      handleDrawerOpen();
    }
    setOpen(!open);
  };
  const childrens = item.children?.map((one) => {
    if (Array.isArray(one.children)) {
      return (
        <NestedListItem
          key={one.label}
          item={one}
          classes={classes}
          level={level + 1}
          handleDrawerOpen={handleDrawerOpen}
          drawerOpen={drawerOpen}
        />
      );
    } else {
      return (
        <SingleListItem
          key={one.label}
          item={one}
          classes={classes}
          level={level + 1}
        />
      );
    }
  });

  const icon = item.icon ? (
    <ListItemIcon>
      <FontAwesomeIcon icon={["fas", item.icon]} />
    </ListItemIcon>
  ) : null;
  return (
    <>
      <ListItem button onClick={handleClick} disableGutters>
        {icon}
        <ListItemText primary={item.label}></ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.subMenu}>
          {childrens}
        </List>
      </Collapse>
    </>
  );
};
