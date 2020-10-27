import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
  Dropdown,
} from "reactstrap";

import Logo from "assets/images/logo.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import "assets/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  navBarCSS: {
    padding: "4px 1rem !important",
    backgroundColor: "#fff !important",
    minHeight: "64px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
  headerDropdown: {
    backgroundColor: "#fff",
    minWidth: "205px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    borderBottom: "3px solid  #26A456",
    marginTop: "0px",
  },
  navLinkHeader: {
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.2",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: ".5rem",
    paddingLeft: ".5rem",
    fontWeight: "600",
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",

    "& hover": {
      color: "#0b6fb8",
    },
  },
  productLink: {
    color: "#555",
    padding: "0 1rem 8px 1rem",
    display: "inline-block",
    verticalAlign: "middle",
    cursor: "pointer",
    textTransform: "capitalize",
  },
  font13: {
    fontSize: "13px",
  },
  loginDropdown: {
    width: "160px",
  },
}));

const Header = (props) => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const [dropdownOpen1, setdropdownOpen1] = useState(false);
  const [dropdownOpen2, setdropdownOpen2] = useState(false);
  const [dropdownOpen3, setdropdownOpen3] = useState(false);
  const [dropdownOpen4, setdropdownOpen4] = useState(false);
  const [dropdownOpen5, setdropdownOpen5] = useState(false);
  const [dropdownOpen6, setdropdownOpen6] = useState(false);
  const [dropdownOpen7, setdropdownOpen7] = useState(false);
  const [dropdownOpen8, setdropdownOpen8] = useState(false);
  const [dropdownOpen9, setdropdownOpen9] = useState(false);
  const [dropdownOpen10, setdropdownOpen10] = useState(false);
  const [dropdownOpen11, setdropdownOpen11] = useState(false);
  const [dropdownOpen12, setdropdownOpen12] = useState(false);
  const [dropdownOpen13, setdropdownOpen13] = useState(false);
  const [dropdownOpen14, setdropdownOpen14] = useState(false);
  const [dropdownOpen15, setdropdownOpen15] = useState(false);
  const [dropdownOpen16, setdropdownOpen16] = useState(false);
  const [dropdownOpen17, setdropdownOpen17] = useState(false);
  const [dropdownOpen18, setdropdownOpen18] = useState(false);
  const [dropdownOpen19, setdropdownOpen19] = useState(false);
  const [dropdownOpen20, setdropdownOpen20] = useState(false);
  const [dropdownOpen21, setdropdownOpen21] = useState(false);
  const [dropdownOpen22, setdropdownOpen22] = useState(false);

  const toggle2 = () => setIsOpen2(!isOpen2);

  const showDropdown = (valDrop) => {
    if (valDrop === "dropdownOpen1") {
      setdropdownOpen1(true);
    } else if (valDrop === "dropdownOpen2") {
      setdropdownOpen2(true);
    } else if (valDrop === "dropdownOpen3") {
      setdropdownOpen3(true);
    } else if (valDrop === "dropdownOpen4") {
      setdropdownOpen4(true);
    } else if (valDrop === "dropdownOpen5") {
      setdropdownOpen5(true);
    } else if (valDrop === "dropdownOpen6") {
      setdropdownOpen6(true);
    } else if (valDrop === "dropdownOpen7") {
      setdropdownOpen7(true);
    } else if (valDrop === "dropdownOpen8") {
      setdropdownOpen8(true);
    } else if (valDrop === "dropdownOpen9") {
      setdropdownOpen9(true);
    } else if (valDrop === "dropdownOpen10") {
      setdropdownOpen10(true);
    } else if (valDrop === "dropdownOpen11") {
      setdropdownOpen11(true);
    } else if (valDrop === "dropdownOpen12") {
      setdropdownOpen12(true);
    } else if (valDrop === "dropdownOpen13") {
      setdropdownOpen13(true);
    } else if (valDrop === "dropdownOpen14") {
      setdropdownOpen14(true);
    } else if (valDrop === "dropdownOpen15") {
      setdropdownOpen15(true);
    } else if (valDrop === "dropdownOpen16") {
      setdropdownOpen16(true);
    } else if (valDrop === "dropdownOpen17") {
      setdropdownOpen17(true);
    } else if (valDrop === "dropdownOpen18") {
      setdropdownOpen18(true);
    } else if (valDrop === "dropdownOpen19") {
      setdropdownOpen19(true);
    } else if (valDrop === "dropdownOpen20") {
      setdropdownOpen20(true);
    } else if (valDrop === "dropdownOpen21") {
      setdropdownOpen21(true);
    } else if (valDrop === "dropdownOpen22") {
      setdropdownOpen22(true);
    }
  };
  const hideDropdown = (valDrop) => {
    if (valDrop === "dropdownOpen1") {
      setdropdownOpen1(false);
    } else if (valDrop === "dropdownOpen2") {
      setdropdownOpen2(false);
    } else if (valDrop === "dropdownOpen3") {
      setdropdownOpen3(false);
    } else if (valDrop === "dropdownOpen4") {
      setdropdownOpen4(false);
    } else if (valDrop === "dropdownOpen5") {
      setdropdownOpen5(false);
    } else if (valDrop === "dropdownOpen6") {
      setdropdownOpen6(false);
    } else if (valDrop === "dropdownOpen7") {
      setdropdownOpen7(false);
    } else if (valDrop === "dropdownOpen8") {
      setdropdownOpen8(false);
    } else if (valDrop === "dropdownOpen9") {
      setdropdownOpen9(false);
    } else if (valDrop === "dropdownOpen10") {
      setdropdownOpen10(false);
    } else if (valDrop === "dropdownOpen11") {
      setdropdownOpen11(false);
    } else if (valDrop === "dropdownOpen12") {
      setdropdownOpen12(false);
    } else if (valDrop === "dropdownOpen13") {
      setdropdownOpen13(false);
    } else if (valDrop === "dropdownOpen14") {
      setdropdownOpen14(false);
    } else if (valDrop === "dropdownOpen15") {
      setdropdownOpen15(false);
    } else if (valDrop === "dropdownOpen16") {
      setdropdownOpen16(false);
    } else if (valDrop === "dropdownOpen17") {
      setdropdownOpen17(false);
    } else if (valDrop === "dropdownOpen18") {
      setdropdownOpen18(false);
    } else if (valDrop === "dropdownOpen19") {
      setdropdownOpen19(false);
    } else if (valDrop === "dropdownOpen20") {
      setdropdownOpen20(false);
    } else if (valDrop === "dropdownOpen21") {
      setdropdownOpen21(false);
    } else if (valDrop === "dropdownOpen22") {
      setdropdownOpen22(false);
    }
  };
  const toggle = () => {
    setdropdownOpen((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  const classes = useStyles();

  return (
    <header>
      <Container fluid={true}>
        <Navbar
          color="light"
          light
          expand="sm"
          fixed="top"
          className={classes.navBarCSS}
        >
          <NavbarToggler onClick={toggle2} />
          <Collapse isOpen={isOpen2} navbar>
            <Container className="header-navbar-container" fluid={true}>
              <div className="py-1">
                <NavbarBrand href="/" className="mr-auto">
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
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen1")}
                    onMouseLeave={() => hideDropdown("dropdownOpen1")}
                    isOpen={dropdownOpen1}
                  >
                    <DropdownToggle
                      tag="div"
                      className="nav-link pointer"
                      caret
                    >
                      <NavLink
                        href="https://ratnaafin.com/about-us/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        About Us
                      </NavLink>
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/who-we-are/"
                        >
                          Who We Are
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/vision-mission/"
                        >
                          Vision &amp; Mission
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/core-values/"
                        >
                          Core Values
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/clients/"
                        >
                          Clients
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/testimonials/"
                        >
                          Testimonials
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/team/"
                        >
                          Team
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/company-profile/"
                        >
                          Company Profile
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink
                      href="https://ratnaafin.com/team/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Team
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://ratnaafin.com/insights/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Insights
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen2")}
                    onMouseLeave={() => hideDropdown("dropdownOpen2")}
                    isOpen={dropdownOpen2}
                  >
                    <DropdownToggle
                      tag="div"
                      className={classes.navLinkHeader + " nav-link"}
                      caret
                    >
                      <a
                        href="https://ratnaafin.com/events/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Events
                      </a>
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/professional-events/"
                        >
                          Professional Events
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/social-events/"
                        >
                          Social Events
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen3")}
                    onMouseLeave={() => hideDropdown("dropdownOpen3")}
                    isOpen={dropdownOpen3}
                  >
                    <DropdownToggle
                      tag="div"
                      className="nav-link pointer"
                      caret
                    >
                      <a
                        href="https://ratnaafin.com/tools/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tools
                      </a>
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/gst-calculator/"
                        >
                          GST Calculator
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/emi-calculator/"
                        >
                          EMI Calculator
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/cibil/"
                        >
                          CIBIL
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink
                      href="https://ratnaafin.com/careers/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Careers
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://ratnaafin.com/contact-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact Us
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown
                    tag="li"
                    className="loginLink"
                    onMouseOver={() => showDropdown("dropdownOpen4")}
                    onMouseLeave={() => hideDropdown("dropdownOpen4")}
                    isOpen={dropdownOpen4}
                  >
                    <DropdownToggle tag="a" className="nav-link pointer" caret>
                      <AccountCircleIcon /> &nbsp;Login &nbsp;
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + classes.loginDropdown}
                    >
                      <DropdownItem tag="a">Customer</DropdownItem>
                      <DropdownItem tag="a">Partner</DropdownItem>
                      <DropdownItem tag="a">Employee</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>

                <Nav className="ml-auto nav-three" navbar>
                  <UncontrolledDropdown
                    tag="li"
                    className="pointer"
                    onMouseOver={() => showDropdown("dropdownOpen5")}
                    onMouseLeave={() => hideDropdown("dropdownOpen5")}
                    isOpen={dropdownOpen5}
                  >
                    <DropdownToggle
                      tag="a"
                      className={classes.navLinkHeader}
                      caret
                    >
                      Loans
                    </DropdownToggle>
                    <DropdownMenu className={classes.headerDropdown}>
                      <Dropdown
                        className="product-dropdownxx"
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen12")}
                        onMouseLeave={() => hideDropdown("dropdownOpen12")}
                        isOpen={dropdownOpen12}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          Retails Loans
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-linksxx"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">Retail Home Loan</DropdownItem>
                          <DropdownItem tag="a">
                            Retail LAP (Loan Against Property)
                          </DropdownItem>
                          <DropdownItem tag="a">
                            Retail LRD (Lease Rental Discounting)
                          </DropdownItem>
                          <DropdownItem tag="a">Retail APF</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen13")}
                        onMouseLeave={() => hideDropdown("dropdownOpen13")}
                        isOpen={dropdownOpen13}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          SME Loans
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">SME CC/OD</DropdownItem>
                          <DropdownItem tag="a">SME Term Loan</DropdownItem>
                          <DropdownItem tag="a">
                            SME Term Loan + CC/OD
                          </DropdownItem>
                          <DropdownItem tag="a">
                            SME NFB (Non Fund Base)
                          </DropdownItem>
                          <DropdownItem tag="a">
                            SME LAP (Loan Against Property)
                          </DropdownItem>
                          <DropdownItem tag="a">SME CGTMSE</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen14")}
                        onMouseLeave={() => hideDropdown("dropdownOpen14")}
                        isOpen={dropdownOpen14}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          INFRA Loans
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">
                            Construction Finance
                          </DropdownItem>
                          <DropdownItem tag="a">
                            Infrastructure Finance
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen15")}
                        onMouseLeave={() => hideDropdown("dropdownOpen15")}
                        isOpen={dropdownOpen15}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          Unsecured Loans
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="div">
                            <div>Business Loan</div>
                          </DropdownItem>
                          <DropdownItem tag="div">
                            <div>Personal Loan</div>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            School Fee Funding
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen16")}
                        onMouseLeave={() => hideDropdown("dropdownOpen16")}
                        isOpen={dropdownOpen16}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          Channel Finance
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">
                            <div>Anchor Lead Bill Discounting</div>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            <div>Anchor Lead Input Finance</div>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            <div>Vendor Lead Bill Discounting</div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen6")}
                    onMouseLeave={() => hideDropdown("dropdownOpen6")}
                    isOpen={dropdownOpen6}
                  >
                    <DropdownToggle tag="a" className="nav-link pointer" caret>
                      Govt. Subsidy
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <DropdownItem tag="a">Interest Subsidy</DropdownItem>
                      <DropdownItem tag="a">Central Govt. Subsidy</DropdownItem>
                      <DropdownItem tag="a">GST Subsidy</DropdownItem>
                      <DropdownItem tag="a">Capital Subsidy</DropdownItem>
                      <DropdownItem tag="a">Electric Subsidy</DropdownItem>
                      <DropdownItem tag="a">Others</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen7")}
                    onMouseLeave={() => hideDropdown("dropdownOpen7")}
                    isOpen={dropdownOpen7}
                  >
                    <DropdownToggle
                      tag="a"
                      className={classes.navLinkHeader}
                      caret
                    >
                      Gen. Insurance
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <DropdownItem tag="a">Aviation Insurance</DropdownItem>
                      <DropdownItem tag="a">Credit Insurance</DropdownItem>
                      <DropdownItem tag="a">Agriculture Insurance</DropdownItem>
                      <DropdownItem tag="a">Engineering Insurance</DropdownItem>
                      <DropdownItem tag="a">Fire Insurance</DropdownItem>
                      <DropdownItem tag="a">Health Insurance</DropdownItem>
                      <DropdownItem tag="a">Liability Insurance</DropdownItem>
                      <DropdownItem tag="a">Marine Cargo</DropdownItem>
                      <DropdownItem tag="a">
                        Miscellaneous Insurance
                      </DropdownItem>
                      <DropdownItem tag="a">Motor Insurance</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen8")}
                    onMouseLeave={() => hideDropdown("dropdownOpen8")}
                    isOpen={dropdownOpen8}
                  >
                    <DropdownToggle tag="a" className="nav-link pointer" caret>
                      Life Insurance
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <DropdownItem tag="a">Term Plan Insurance</DropdownItem>
                      <DropdownItem tag="a">
                        Traditional Plan Insurance
                      </DropdownItem>
                      <DropdownItem tag="a">ULIP PlancInsurance</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen9")}
                    onMouseLeave={() => hideDropdown("dropdownOpen9")}
                    isOpen={dropdownOpen9}
                  >
                    <DropdownToggle tag="a" className="nav-link pointer" caret>
                      Elite Services
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " EliteDropdown"}
                    >
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen17")}
                        onMouseLeave={() => hideDropdown("dropdownOpen17")}
                        isOpen={dropdownOpen17}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          Business Voluations
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">Business Takeover</DropdownItem>
                          <DropdownItem tag="a">
                            Purchase Valuation
                          </DropdownItem>
                          <DropdownItem tag="a">
                            New Share Issue valuation
                          </DropdownItem>
                          <DropdownItem tag="a">
                            Business Synergy Valuation
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen18")}
                        onMouseLeave={() => hideDropdown("dropdownOpen18")}
                        isOpen={dropdownOpen18}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          Strategic Financial Advisor
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">
                            Company profile preparation
                          </DropdownItem>
                          <DropdownItem tag="a">
                            Outsourced CFO Service
                          </DropdownItem>
                          <DropdownItem tag="a">Project Report</DropdownItem>
                          <DropdownItem tag="a">
                            Financial Projections
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen19")}
                        onMouseLeave={() => hideDropdown("dropdownOpen19")}
                        isOpen={dropdownOpen19}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          Compliance services
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">COP certificate</DropdownItem>
                          <DropdownItem tag="a">MOF certificate</DropdownItem>
                          <DropdownItem tag="a">
                            Funds Utilisation Certificate
                          </DropdownItem>
                          <DropdownItem tag="a">DCCO Certificate</DropdownItem>
                          <DropdownItem tag="a">
                            Net Worth Certificate
                          </DropdownItem>
                          <DropdownItem tag="a">
                            Statutary Compliance Certificate
                          </DropdownItem>
                          <DropdownItem tag="a">
                            Certificate for Subsidy
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen20")}
                        onMouseLeave={() => hideDropdown("dropdownOpen20")}
                        isOpen={dropdownOpen20}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          Equity Fund Raise
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="a">Angle Fund Raise</DropdownItem>
                          <DropdownItem tag="a">Seed Fund Raise</DropdownItem>
                          <DropdownItem tag="a">VC Fund Raise</DropdownItem>
                          <DropdownItem tag="a">PE Fund Raise</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown>
                        <DropdownItem tag="a" className={classes.productLink}>
                          Merger & Acquisition
                        </DropdownItem>
                      </Dropdown>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown
                    tag="li"
                    className="pointer"
                    onMouseOver={() => showDropdown("dropdownOpen21")}
                    onMouseLeave={() => hideDropdown("dropdownOpen21")}
                    isOpen={dropdownOpen21}
                  >
                    <DropdownToggle
                      tag="a"
                      className={classes.navLinkHeader}
                      caret
                    >
                      <a
                        href="https://ratnaafin.com/investment-banking/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.navLinkHeader}
                      >
                        Investment Banking
                      </a>
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <Dropdown
                        className="product-dropdown"
                        direction="right"
                        onMouseOver={() => showDropdown("dropdownOpen22")}
                        onMouseLeave={() => hideDropdown("dropdownOpen22")}
                        isOpen={dropdownOpen22}
                      >
                        <DropdownToggle
                          tag="a"
                          className={classes.productLink}
                          caret
                        >
                          <a
                            href="https://ratnaafin.com/fund-raise/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Fund Raise
                          </a>
                        </DropdownToggle>
                        <DropdownMenu
                          className="product-links"
                          style={{ transform: "unset" }}
                        >
                          <DropdownItem tag="div">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://ratnaafin.com/loans/"
                            >
                              Loans
                            </a>
                          </DropdownItem>
                          <DropdownItem tag="div">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://ratnaafin.com/equity/"
                            >
                              Equity
                            </a>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/merger-acquisitions/"
                        >
                          Merger &amp; Acquisitions
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/financial-compliances/"
                        >
                          Financial Compliances
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/transaction-advisory/"
                        >
                          Transaction Advisory
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink
                      href="https://ratnaafin.com/lending-2/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lending
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown
                    tag="li"
                    onMouseOver={() => showDropdown("dropdownOpen11")}
                    onMouseLeave={() => hideDropdown("dropdownOpen11")}
                    isOpen={dropdownOpen11}
                  >
                    <DropdownToggle tag="a" className="nav-link pointer" caret>
                      <NavLink
                        href="https://ratnaafin.com/global-solutions/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Global Solutions
                      </NavLink>
                    </DropdownToggle>
                    <DropdownMenu
                      className={classes.headerDropdown + " onestep"}
                    >
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/offshore-services/"
                        >
                          Offshore Services
                        </a>
                      </DropdownItem>
                      <DropdownItem tag="div">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://ratnaafin.com/kpo/"
                        >
                          KPO
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </div>
            </Container>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
