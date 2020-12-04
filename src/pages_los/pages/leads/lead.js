import { Fragment, useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { APISDK } from "registry/fns/sdk";

import { DisplayData } from "./displayData";
import { Tooltip as LightTooltip } from "components/styledComponent/tooltip";

const useStyles = makeStyles((theme) => ({
  actions: {
    color: "#26A456",
    cursor: "pointer",
    marginRight: "10px",
  },
}));

export const EmployeeLead = () => {
  const classes = useStyles();
  const [InquiryDetailsList, setInquiryDetailsList] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const currentInqCode = useRef("");
  // const [currentRow, setCurrentRow] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (event, currenIndex) => {
    event.preventDefault();
    // setCurrentRow(InquiryDetailsList[currenIndex]);
    currentInqCode.current = InquiryDetailsList[currenIndex][0];
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  //get user inquiry details

  useEffect(() => {
    const fetcher = async () => {
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
    };
    fetcher();
  }, [InquiryDetailsList]);

  const columns = [
    {
      label: "Inquiry ID",
      name: "inquiryId",
      options: {
        filter: false,
      },
    },
    {
      label: "Inquiry Date",
      name: "inquiryDate",
      options: {
        filter: false,
      },
    },
    {
      label: "Product Type",
      name: "productType",
      options: {
        filter: true,
      },
    },
    {
      label: "Customer Name",
      name: "customerName",
      options: {
        filter: false,
      },
    },
    {
      label: "Mobile No.",
      name: "mobileNumber",
      options: {
        filter: false,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: false,
      },
    },
    {
      label: "Inquiry Status",
      name: "inquiryStatus",
      options: {
        filter: true,
      },
    },
    {
      label: "Lead Generated",
      name: "leadGenerated",
      options: {
        filter: true,
      },
    },
    {
      label: "Questionaries / Health Check Score",
      name: "questionsHealthCheckScore",
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
    <Fragment>
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
    </Fragment>
  );
};
