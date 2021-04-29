import { Fragment } from "react";
import "assets/css/bootstrap.min.css";
import { Container, Navbar } from "reactstrap";
import Logo from "assets/images/logo.svg";
import { useStyles } from "./style";

export const Header = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <FullScreenNav classes={classes} />
    </Fragment>
  );
};

export const FullScreenNav = ({ classes }) => {
  return (
    <header>
      <Navbar color="light" light expand="lg" fixed="top">
        <Container className="header-navbar-container" fluid={true}>
          <div className="py-1">
            <img src={Logo} alt="Ratnaafin" />
          </div>
        </Container>
      </Navbar>
    </header>
  );
};
