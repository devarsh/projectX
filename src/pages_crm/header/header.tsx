import "assets/css/bootstrap.min.css";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Logo from "assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import CallIcon from "@material-ui/icons/Call";
import { formsNav, siteNav } from "./metaData";
import { NavRenderer } from "./renderer";
import { useState } from "react";
import { useStyles } from "./style";

export const Navigation = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((open) => !open);
  return (
    <header>
      <Container fluid={true}>
        <Navbar
          color="light"
          light
          expand="lg"
          fixed="top"
          className={classes.navBarCSS}
        >
          <NavbarToggler onClick={toggle} />
          <Collapse navbar isOpen={open}>
            <Container className="header-navbar-container" fluid={true}>
              <div className="py-1 BrandLogo">
                <NavbarBrand
                  className="mr-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  <img src={Logo} alt="Ratnaafin" />
                </NavbarBrand>
              </div>
              <div className="navigation-links">
                <Nav className="mr-0 nav-one" navbar>
                  <NavItem>
                    <NavLink
                      className={classes.font13}
                      href="tel:+919016130471"
                    >
                      <CallIcon />
                      +91 90161 30471
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classes.font13}
                      href="https://ratnaafin.com/company-profile/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Company Profile
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto nav-two" navbar>
                  <NavRenderer metaData={siteNav} classes={classes} />
                </Nav>
                <Nav className="ml-auto nav-three" navbar={true}>
                  <NavRenderer metaData={formsNav} classes={classes} />
                </Nav>
              </div>
            </Container>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};
