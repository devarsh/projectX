/**
 * Nav --->
 *         NavItem
 *         UnControlledDropDown
 *                            ---->
 *                                 DropDownToggle
 *                                          ----->
 *                                              TextNode
 *                                              AnchorTag
 *                                 DropDownMenu
 *                                          ----->
 *                                               UnControlledDropDown
 *                                               DropdownItem
 */

import { FC, useState } from "react";
import {
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { NavItemType, NavBarType } from "./types";
import { HeaderNameProps } from "./style";

export interface NavRendererType {
  metaData: NavBarType;
  classes: HeaderNameProps;
}

export const NavRenderer: FC<NavRendererType> = ({ metaData, classes }) => {
  let result;
  if (Array.isArray(metaData.navItems)) {
    result = metaData.navItems.map((item) => {
      if (Array.isArray(item.children)) {
        return <NestedNavItem key={item.label} item={item} classes={classes} />;
      } else {
        return (
          <NavItem key={item.label}>
            <NavLink href={item.href} target={item.target} rel={item.rel}>
              {item.label}
            </NavLink>
          </NavItem>
        );
      }
    });
  } else {
    result = <div>Invalid metadata for navigation</div>;
  }
  return result;
};

export interface NestedNavItemProps {
  item: NavItemType;
  classes: HeaderNameProps;
  direction?: string;
}

export const NestedNavItem: FC<NestedNavItemProps> = ({
  item,
  classes,
  direction,
}) => {
  const [open, setOpen] = useState(false);
  const handleShow = (e) => {
    e?.stopPropogation?.();
    if (open === false) {
      setOpen(true);
    }
  };
  const handleHide = (e) => {
    e?.stopPropogation?.();
    if (open === true) {
      setOpen(false);
    }
  };
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  let result;
  if (Array.isArray(item.children)) {
    result = (
      <Dropdown
        tag="li"
        key={item.label}
        direction={Boolean(direction) ? direction : undefined}
        inNavbar={true}
        isOpen={open}
        onMouseOver={handleShow}
        onMouseLeave={handleHide}
        toggle={toggle}
      >
        <DropdownToggle tag="div" className="nav-link pointer" caret={true}>
          <NavLink href={item.href} target={item.target} rel={item.rel}>
            {item.label}
          </NavLink>
        </DropdownToggle>
        <DropdownMenu tag="ul" className={classes.headerDropdown + " onestep"}>
          {item.children.map((one) => {
            if (Array.isArray(one.children)) {
              return (
                <NestedNavItem
                  key={one.label}
                  item={one}
                  classes={classes}
                  direction="right"
                />
              );
            } else {
              return (
                <DropdownItem
                  tag="a"
                  key={one.label}
                  onClick={(e) => {
                    handleHide(e);
                    //this is a stupid hack, but works for now, need to find a proper workaround
                    document.getElementById("root")?.click();
                  }}
                >
                  {one.label}
                </DropdownItem>
              );
            }
          })}
        </DropdownMenu>
      </Dropdown>
    );
  } else {
    result = <div>oops</div>;
  }
  return result;
};
