import React from "react";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { GridTabPanel } from "./gridTabPanel";
import { DetailsTabPanel } from "./detailsTabPanel";
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

const StyledTabs = withStyles({
  root: {
    borderBottom: "0 ",

    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
  },
  indicator: {
    backgroundColor: "#0063a3",
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
        color: "#0063a3",
        fontWeight: "600",
      },
      "&:focus": {
        color: "#0063a3",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: React.ReactNode;
}

export const TabContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <StyledTabs value={value} onChange={handleChange} aria-label="lead tabs">
        <Leadtab
          label={
            <Box display="flex" justifyContent="space-between">
              <ChevronLeftIcon /> Previous
            </Box>
          }
          {...a11yProps(0)}
        />
        <Leadtab
          label={
            <Box display="flex" justifyContent="space-between">
              Next <ChevronRightIcon />
            </Box>
          }
          {...a11yProps(1)}
        />
      </StyledTabs>
      <div>
        <TabPanel value={value} index={0}>
          <GridTabPanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DetailsTabPanel />
        </TabPanel>
      </div>
    </>
  );
};
