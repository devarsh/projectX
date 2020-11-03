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
import { formsNav, siteNav } from "./metaData";
import { NavRenderer } from "./renderer";
import { useStyles, HeaderNameProps, HeaderStyleProps } from "./style";
import { useNavigate } from "react-router-dom";
import CallIcon from "@material-ui/icons/Call";

export const Navigation = () => {
  const classes: HeaderNameProps = useStyles({} as HeaderStyleProps);
  const navigate = useNavigate();
  return (
    <header>
      <Container>
        <Navbar
          color="light"
          light
          expand="md"
          fixed="top"
          className={classes.navBarCSS}
        >
          <NavbarToggler />
          <Collapse navbar>
            <Container className="header-navbar-container" fluid={true}>
              <div className="py-1">
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
              <div>
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
