import React, { useState, forwardRef } from "react";
import { List, ListItem, Collapse, Button } from "@material-ui/core";
import clsx from "clsx";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import menuItems from "./sideBarItems";
import { NavLink as RouterLink } from "react-router-dom";
import useStyles from "./menuBarStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { faHandsHelping } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const MenuBar = (props) => {
  const [menu, setMenu] = useState({});
  const { className, ...rest } = props;
  const classes = useStyles();
  const handleClick = (item) => {
    let newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  ));
  const handleMenu = (children, level = 0) => {
    return children.map(({ children, name, url, icon, links }) => {
      if (!children) {
        return (
          <List
            component="div"
            disablePadding
            key={name}
            className={classes.ListCSS + " SideBarWrap"}
          >
            <ListItem
              className={classes.item}
              disableGutters
              style={{ padding: "0px" }}
              key={name}
              component="div"
            >
              <Button
                className={clsx({
                  [classes.btnRoot]: true,
                  [classes.button]: true,
                  [classes.subMenu]: level,
                })}
                component={CustomRouterLink}
                to={url}
              >
                <ListItemIcon className={classes.ListIcon}>
                  {icon == "faHashtag" ? (
                    <FontAwesomeIcon
                      icon={faHashtag}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faBars" ? (
                    <FontAwesomeIcon
                      icon={faBars}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faTasks" ? (
                    <FontAwesomeIcon
                      icon={faTasks}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faBalanceScale" ? (
                    <FontAwesomeIcon
                      icon={faBalanceScale}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faHome" ? (
                    <FontAwesomeIcon
                      icon={faHome}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faHandHoldingHeart" ? (
                    <FontAwesomeIcon
                      icon={faHandHoldingHeart}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faTh" ? (
                    <FontAwesomeIcon
                      icon={faTh}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faHandsHelping" ? (
                    <FontAwesomeIcon
                      icon={faHandsHelping}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faUsers" ? (
                    <FontAwesomeIcon
                      icon={faUsers}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faUsersCog" ? (
                    <FontAwesomeIcon
                      icon={faUsersCog}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faCog" ? (
                    <FontAwesomeIcon
                      icon={faCog}
                      className={classes.sidebarIcon}
                    />
                  ) : icon == "faCircle" ? (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={classes.sidebarIcon + classes.faSmall}
                    />
                  ) : icon == "faUserCircle" ? (
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className={classes.sidebarIcon + classes.faSmall}
                    />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={name} className={classes.sidebarLnk} />
              </Button>
            </ListItem>
          </List>
        );
      }
      return (
        <div key={name}>
          <ListItem
            className={classes.item}
            disableGutters
            key={name}
            onClick={() => handleClick(name)}
            component="div"
          >
            <Button
              className={clsx({
                [classes.btnRoot]: true,
                [classes.button]: true,
                [classes.subMenu]: level,
              })}
            >
              <ListItemIcon className={classes.ListIcon}>
                {icon == "faHashtag" ? (
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faBars" ? (
                  <FontAwesomeIcon
                    icon={faBars}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faTasks" ? (
                  <FontAwesomeIcon
                    icon={faTasks}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faBalanceScale" ? (
                  <FontAwesomeIcon
                    icon={faBalanceScale}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faHome" ? (
                  <FontAwesomeIcon
                    icon={faHome}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faHandHoldingHeart" ? (
                  <FontAwesomeIcon
                    icon={faHandHoldingHeart}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faTh" ? (
                  <FontAwesomeIcon
                    icon={faTh}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faHandsHelping" ? (
                  <FontAwesomeIcon
                    icon={faHandsHelping}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faUsers" ? (
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faUsersCog" ? (
                  <FontAwesomeIcon
                    icon={faUsersCog}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faCog" ? (
                  <FontAwesomeIcon
                    icon={faCog}
                    className={classes.sidebarIcon}
                  />
                ) : icon == "faCircle" ? (
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={classes.sidebarIcon + classes.faSmall}
                  />
                ) : icon == "faUserCircle" ? (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className={classes.sidebarIcon + classes.faSmall}
                  />
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText primary={name} className={classes.sidebarLnk} />

              {menu[name] ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </ListItem>
          <Collapse in={menu[name] ? true : false} timeout="auto" unmountOnExit>
            {handleMenu(children, 1)}
          </Collapse>
        </div>
      );
    });
  };

  return <React.Fragment>{handleMenu(menuItems.data)}</React.Fragment>;
};

export default MenuBar;
