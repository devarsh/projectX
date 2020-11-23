import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EmployeeHeader from "../header/index";
import { APISDK } from "registry/fns/sdk";

import { DisplayData } from "./displayData";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  PageTitle: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.75rem",
    fontWeight: "700",
    alignSelf: "flex-start",
    marginBottom: "20px",
  },
  root: {
    display: "flex",
    backgroundColor: "#FAFAFA",
  },
  common: {
    themecolor1: "#0063A3",
    themecolor2: "#26A456",
    white: "#FFFFFF",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fff",
    color: "#0063A3",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  fixedHeight: {
    height: 240,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(0, 99, 163,0.15)",
    "&:hover": {
      backgroundColor: "rgba(0, 99, 163,0.25)",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  actions: {
    color: "#26A456",
    cursor: "pointer",
    marginRight: "10px",
  },

  formLabel: {
    fontWeight: "600",
  },
  formValue: {
    fontWeight: "500",
    color: "#0063A3",
  },
  marginSet: {
    margin: theme.spacing(3, 0),
  },

  DialogTitle: {
    color: "#0063A3",
    borderBottom: "1px solid #ddd",
  },
  DetailsTitle: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.2rem",
    fontWeight: "700",
    alignSelf: "flex-start",
    margin: "0",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.2rem",
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    border: 0,
    color: "#fff !important",
    padding: "4px .75rem",
    fontWeight: "700",
    minWidth: "120px",
    letterSpacing: "0.02857em",
    boxShadow: "none",
    textTransform: "capitalize",
    borderRadius: "24px",
    alignSelf: "flex-end",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
      boxShadow: "none",
    },
  },
  backBtn: {
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    background: "#e0e0e0",
    color: "#0b6fb8 !important",
    margin: theme.spacing(3, 2, 2),
    fontSize: "1.2rem",
    borderRadius: "24px",
    fontWeight: "700",
    minWidth: "120px",
    letterSpacing: "0.02857em",
    padding: "4px .75rem",
    textTransform: "capitalize",
    "&:hover": {
      color: "#0b6fb8 !important",
      background: "#e0e0e0",
      boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#26A456",
    color: "#fff",
    boxShadow: "0 3px 6px rgba(0,0,0,0.46)",
    fontSize: 11,
    borderBottom: "1px solid #26A456",
  },
  arrow: {
    fontSize: 16,
    width: 17,
    "&::before": {
      border: "1px solid #fff",
      backgroundColor: "#26A456",
      boxSizing: "border-box",
    },
  },
}))(Tooltip);

export default function EmployeeLead() {
  const classes = useStyles();
  const [InquiryDetailsList, setInquiryDetailsList] = React.useState([]);
  const [openDetails, setOpenDetails] = React.useState(false);
  const currentInqCode = React.useRef("");
  const [currentRow, setCurrentRow] = React.useState({});
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (event, currenIndex) => {
    event.preventDefault();
    setCurrentRow(InquiryDetailsList[currenIndex]);
    currentInqCode.current = InquiryDetailsList[currenIndex][0];
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  //get user inquiry details

  useEffect(async () => {
    const result = await APISDK.getDashboardEmployeeDataList();
    // console.log("result", result);
    try {
      setLoading(true);
      if (result.status === "success") {
        let dataNew = result.data.map((x) => {
          return [
            x.inquiry_code,
            x.inquiry_date,
            x.product_type,
            x.customer_name,
            x.mobile_no,
            x.email_id,
            x.inquiry_status,
            x.lead_generaate,
            x.questionaaries + "/" + x.health_score,
          ];
        });
        setInquiryDetailsList(dataNew);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("in catch");
    }
  }, [InquiryDetailsList]);

  const columns = [
    {
      label: "Inquiry ID",
      name: "InquiryId",
      options: {
        filter: false,
      },
    },
    {
      label: "Inquiry Date",
      name: "InquiryDate",
      options: {
        filter: false,
      },
    },
    {
      label: "Product Type",
      name: "ProductType",
      options: {
        filter: true,
      },
    },
    {
      label: "Customer Name",
      name: "",
      options: {
        filter: false,
      },
    },
    {
      label: "Mobile No.",
      name: "",
      options: {
        filter: false,
      },
    },
    {
      label: "Email",
      name: "",
      options: {
        filter: false,
      },
    },
    {
      label: "Inquiry Status",
      name: "",
      options: {
        filter: true,
      },
    },
    {
      label: "Lead Generated",
      name: "Generate_lead",
      options: {
        filter: true,
      },
    },
    {
      label: "Questionaries / Health Check Score",
      name: "",
      options: {
        filter: false,
      },
    },
    {
      label: "Action",
      name: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        download: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
              <LightTooltip
                disableFocusListener
                title="View"
                arrow
                placement="bottom"
                TransitionComponent={Zoom}
                onClick={handleClickOpen}
              >
                <span className={classes.actions}>
                  <VisibilityIcon />
                </span>
              </LightTooltip>
              <LightTooltip
                disableFocusListener
                title="Edit"
                arrow
                placement="bottom"
                TransitionComponent={Zoom}
                onClick={(e) => handleClickOpen(e, dataIndex)}
              >
                <span className={classes.actions}>
                  <EditIcon />
                </span>
              </LightTooltip>
              <LightTooltip
                disableFocusListener
                title="Delete"
                arrow
                placement="bottom"
                TransitionComponent={Zoom}
              >
                <span className={classes.actions}>
                  <DeleteIcon />
                </span>
              </LightTooltip>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className={classes.root + " DashboardLayout"}>
      <EmployeeHeader />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button className="btn1 minW themeBtn">Generate New Lead</Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} className="table-cover">
              {loading ? <CircularProgress size={20} /> : null}
              <MUIDataTable
                title="Lead Management"
                data={InquiryDetailsList}
                columns={columns}
                options={{
                  filterType: "checkbox",
                  filter: true,
                  viewColumns: false,
                }}
              />
            </Grid>

            {openDetails ? (
              <DisplayData
                onClose={handleCloseDetails}
                open={openDetails}
                row={currentInqCode.current}
              />
            ) : null}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
