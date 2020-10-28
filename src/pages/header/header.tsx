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

export const Navigation = () => {
  const classes: HeaderNameProps = useStyles({} as HeaderStyleProps);
  return (
    <Container>
      <Navbar color="light" light expand="sm" fixed="top">
        <NavbarToggler />
        <Collapse navbar>
          <Container className="header-navbar-container" fluid={true}>
            <div className="py-1">
              <NavbarBrand href="/" className="mr-auto">
                <img src={Logo} alt="Ratnaafin" />
              </NavbarBrand>
            </div>
            <Nav className="mr-0 nav-one" navbar>
              <NavItem>
                <NavLink className={classes.font13} href="tel:+919016130471">
                  <i className="fa fa-phone"></i>+91 90161 30471
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
          </Container>
        </Collapse>
      </Navbar>
    </Container>
  );
};
