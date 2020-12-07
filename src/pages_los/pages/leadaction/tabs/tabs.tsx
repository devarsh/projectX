import React from "react";
import {
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { LeadInformationTab } from "./tabInformation";
import { LeadCustomerTab } from "./tabCustomer";

import { tabsStyle, TabsStyleProps, TabsNameProps } from "./style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
const useStyles = makeStyles<Theme, TabsStyleProps>(tabsStyle);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes: TabsNameProps = useStyles({} as TabsStyleProps);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} className={classes.tabPanel}>
          <Typography>{children}</Typography>
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
    borderBottom: "1px solid #e8e8e8",
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
        backgroundColor: "#e9f2f9",
      },
      "&:focus": {
        color: "#0063a3",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

export const LeadTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const classes: TabsNameProps = useStyles({} as TabsStyleProps);
  return (
    <div>
      <div>
        <Leadtabs value={value} onChange={handleChange} aria-label="lead tabs">
          <Leadtab label="Information" {...a11yProps(0)} />
          <Leadtab label="Documents" {...a11yProps(1)} />
          <Leadtab label="Activity History" {...a11yProps(2)} />
          <Leadtab label="Customer" {...a11yProps(3)} />
          <Leadtab label="Payout" {...a11yProps(4)} />
        </Leadtabs>
      </div>
      <div>
        <TabPanel value={value} index={0}>
          <LeadInformationTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <LeadCustomerTab />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </TabPanel>
      </div>
    </div>
  );
};
