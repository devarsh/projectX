import React from "react";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { LeadInformationTab } from "./tabInformation";
import { LeadCustomerTab } from "./tabCustomer";
import { useStyles } from "./style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box py={2} className={classes.tabPanel}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `lead-tab-${index}`,
    "aria-controls": `lead-tabpanel-${index}`,
  };
}

const Leadtabs = withStyles({
  root: {
    border: "1px solid #e8e8e8",
    background: "#fff",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  indicator: {
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",

    top: 0,
  },
})(Tabs);

const Leadtab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      marginRight: theme.spacing(4),
      opacity: 1,
      color: theme.palette.primary.main,
      fontWeight: 600,
      fontFamily: [
        "Montserrat",
        "Helvetica",
        "Arial",
        "Lucida",
        "sans-serif",
      ].join(","),
      "&:hover": {
        color: "#0063a3",
        opacity: 1,
      },
      "&$selected": {
        color: "#fff",
        fontWeight: "600",
        background:
          "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
      },
      "&:focus": {
        color: "#fff",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

export const DetailsTabContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Leadtabs value={value} onChange={handleChange} aria-label="lead tabs">
        <Leadtab label="Information" {...a11yProps(0)} />
        <Leadtab label="Customer" {...a11yProps(1)} />
        <Leadtab label="Documents" {...a11yProps(2)} />
        <Leadtab label="Activity History" {...a11yProps(3)} />
        <Leadtab label="Payout" {...a11yProps(4)} />
      </Leadtabs>
      <div>
        <TabPanel value={value} index={0}>
          <LeadInformationTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LeadCustomerTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div></div>
        </TabPanel>
        <TabPanel value={value} index={3}></TabPanel>
        <TabPanel value={value} index={4}></TabPanel>
      </div>
    </>
  );
};
