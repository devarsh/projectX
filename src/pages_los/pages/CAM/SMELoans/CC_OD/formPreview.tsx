import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { useNavigate } from "react-router-dom";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useStyles } from "./style";
import { APISDK } from "registry/fns/sdk";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export const CAMFormPreviewPage = ({ onClose, isOpen, row }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [previewDetailsList, setPreviewDetailsList] = useState<any[]>([]);
  let temp = row.values;

  useEffect(() => {
    const getCAMDatapreview = async () => {
      let toStoreData: any = [];
      toStoreData.push({
        udhyamAadharNumber: temp.udhyamAadharNumber,
        incorporationDate: temp.incorporationDate,
        proposedBusiness: temp.proposedBusiness,
        externalCreditRating: temp.externalCreditRating,
        msme: temp.msme,
        promotersDirectorsName: temp.promotersDirectorsName,
        loanAmount: temp.loanAmount,
        loanDetails: temp.loanDetails,
        natureOfFacility: temp.natureOfFacility,
        bankName: temp.bankName,
        outstandingAmount: temp.outstandingAmount,
        rateOfInterest: temp.rateOfInterest,
        newTakeover: temp.newTakeover,
        requestedROI: temp.requestedROI,
        proposedAmount: temp.proposedAmount,
        presentProposedLoancomments: temp.presentProposedLoancomments,
        loanPurpose: temp.loanPurpose,
        chequeBounce: temp.chequeBounce,
        companyHistory: temp.companyHistory,
        existingProducts: temp.existingProducts,
        productEndUse: temp.productEndUse,
        majorSuppliers: temp.majorSuppliers,
        paymenttermSupplier: temp.paymenttermSupplier,

        acr: temp.acr,
        addOffice: temp.addOffice,
        age: temp.age,
        associateCompanies: temp.associateCompanies,
        awardRecognitionreceived: temp.awardRecognitionreceived,
      });
      setPreviewDetailsList(toStoreData);
    };
    getCAMDatapreview();
  }, []);

  return (
    <>
      <Dialog maxWidth="md" open={isOpen} aria-labelledby="Details">
        <DialogContent>
          <DialogContentText>
            {previewDetailsList.map((data) => {
              return (
                <Grid style={{ padding: "5px" }}>
                  <h3 className={classes.heading}>General Details </h3>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={12}>
                      <Paper>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Name of the Unit:
                          </Box>
                          <Box width="60%">Amp</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Constitution of Business:
                          </Box>
                          <Box width="60%">{}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Registered Address:
                          </Box>
                          <Box width="60%">{}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Work Address:
                          </Box>
                          <Box width="60%">{data.addOffice}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Ownership of Factory / Business Premises:
                          </Box>
                          <Box width="60%">{}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Date of incorporation:
                          </Box>
                          <Box width="60%">15/12/2005</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Existing Type of Industry:
                          </Box>
                          <Box width="60%">{}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Nature of Existing Business :
                          </Box>
                          <Box width="60%">{}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Proposed business:
                          </Box>
                          <Box width="60%">{data.proposedBusiness}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            External credit rating:
                          </Box>
                          <Box width="60%">{data.externalCreditRating}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Micro, Small or Medium
                          </Box>
                          <Box width="60%">{data.msme}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            PAN No:
                          </Box>
                          <Box width="60%">AAFCK4589C</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Udhyam No:
                          </Box>
                          <Box width="60%">{data.udhyamAadharNumber}</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            CMR Ranking :
                          </Box>
                          <Box width="60%">Self Employee</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            RF Rating :
                          </Box>
                          <Box width="60%">Self Employee</Box>
                        </Box>
                        <Box className={classes.box}>
                          <Box width="40%" className={classes.fontTitle}>
                            Name of Promoters / Directors
                          </Box>
                          <Box width="60%">{data.promotersDirectorsName}</Box>
                        </Box>

                        <Grid
                          container
                          style={{ borderBottom: "solid 1px" }}
                          direction="row"
                        >
                          <Grid
                            container
                            style={{ borderBottom: "solid 1px" }}
                            direction="row"
                          >
                            <Grid
                              item
                              xs={2}
                              className={classes.gridWithRightBorder}
                            >
                              <h5>Banking Arrangements</h5>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              className={classes.gridWithRightBorder}
                            >
                              <Box>
                                <div className={classes.fontTitle}>
                                  Name of Bank:
                                </div>
                                <div>Federal Bank</div>
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              className={classes.gridWithRightBorder}
                            >
                              <Box>
                                <div className={classes.fontTitle}>Branch:</div>
                                <div>Shivranjani</div>
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              className={classes.gridWithRightBorder}
                            >
                              <Box>
                                <div className={classes.fontTitle}>
                                  Current A/C No:
                                </div>
                                <div>12345678912345</div>
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              md={4}
                              className={classes.gridWithRightBorder}
                            >
                              <Box>
                                <div className={classes.fontTitle}>
                                  Average Bank Balance:
                                </div>
                                <div>{"₹"}10,000</div>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid container style={{ borderBottom: "solid 1px" }}>
                          <Grid
                            xs={2}
                            direction={"column"}
                            style={{
                              height: "200px",
                              borderRight: "1px solid",
                            }}
                          >
                            <Box
                              display="flex"
                              flexDirection="column"
                              style={{
                                justifyContent: "center",
                              }}
                            >
                              <div className={classes.fontTitle}>
                                Loan amount (Rs.):
                              </div>
                              <div>{"₹"}30,000</div>
                            </Box>
                          </Grid>
                          <Grid xs={10}>
                            <Grid
                              container
                              direction={"row"}
                              style={{
                                height: "100px",
                                borderBottom: "solid 1px",
                              }}
                            >
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <div className={classes.fontTitle}>
                                  Present:
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <Box>
                                  <Box className={classes.fontTitle}>
                                    Nature of Facility
                                  </Box>
                                  <Box>{data.natureOfFacility}</Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <Box>
                                  <Box className={classes.fontTitle}>
                                    Name of Bank
                                  </Box>
                                  <Box>{data.bankName}</Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <Box>
                                  <Box className={classes.fontTitle}>
                                    O/s Amount as on(In Lacs)
                                  </Box>
                                  <Box>
                                    {"₹"}
                                    {data.outstandingAmount}
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                style={{
                                  alignItems: "center",
                                  padding: "10px",
                                }}
                              >
                                <Box>
                                  <Box className={classes.fontTitle}>
                                    Rate of Interest
                                  </Box>
                                  <Box>{data.rateOfInterest}</Box>
                                </Box>
                              </Grid>
                            </Grid>

                            <Grid
                              container
                              direction={"row"}
                              style={{ height: "100px" }}
                            >
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <div className={classes.fontTitle}>
                                  Proposed:
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <Box>
                                  <Box className={classes.fontTitle}>
                                    Nature of Facility
                                  </Box>
                                  <Box>{data.natureOfFacility}</Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <Box>
                                  <Box className={classes.fontTitle}>
                                    New / Takeover
                                  </Box>
                                  <Box>{data.newTakeover}</Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                className={classes.gridWithRightBorder}
                              >
                                <Box>
                                  <Box className={classes.fontTitle}>
                                    Requested ROI
                                  </Box>
                                  <Box>
                                    {"₹"}
                                    {data.requestedROI}
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={2}
                                style={{
                                  alignItems: "center",
                                  padding: "10px",
                                }}
                              >
                                <Box>
                                  <div className={classes.fontTitle}>
                                    Amount
                                  </div>
                                  <div>{data.proposedAmount}</div>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                  ;<h3 className={classes.heading}>Business Details </h3>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={12}>
                      <Paper>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Brief history of the Company
                          </Box>
                          <Box width="60%">
                            <ReactReadMoreReadLess
                              charLimit={80}
                              readMoreText={"Read more ▼"}
                              readLessText={"Read less ▲"}
                              readMoreClassName={classes.readMoreReadLess}
                              readLessClassName={classes.readMoreReadLess}
                            >
                              Kravour Foods Pvt. Ltd. is incorporated since 2014
                              for the manufacturing and Trading of Wafer
                              Biscuits. The Companies manufacturing plant is
                              located at Vasna Chacharavadi, on land having area
                              of approx. 1853 Sq. Meter.
                            </ReactReadMoreReadLess>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Existing Products / Services of the company
                          </Box>
                          <Box width="60%">
                            <ReactReadMoreReadLess
                              charLimit={80}
                              readMoreText={"Read more ▼"}
                              readLessText={"Read less ▲"}
                              readMoreClassName={classes.readMoreReadLess}
                              readLessClassName={classes.readMoreReadLess}
                            >
                              Wafer Biscuits in different Flavors like vanilla,
                              strawberry, pineapple, banana, mango, mixed
                              fruits, chocolate, orange and many more
                            </ReactReadMoreReadLess>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            End Use of the Products
                          </Box>
                          <Box width="60%">
                            <ReactReadMoreReadLess
                              charLimit={80}
                              readMoreText={"Read more ▼"}
                              readLessText={"Read less ▲"}
                              readMoreClassName={classes.readMoreReadLess}
                              readLessClassName={classes.readMoreReadLess}
                            >
                              Wafer Biscuits in different Flavors like vanilla,
                              strawberry, pineapple, banana, mango, mixed
                              fruits, chocolate, orange and many more
                            </ReactReadMoreReadLess>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Name of Raw Materials
                          </Box>
                          <Box width="60%">
                            Ingredient1, Ingredient2, Ingredient3,Ingredient4
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Name of Major Suppliers
                          </Box>
                          <Box width="60%">Kravour Foods</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Payment Terms with Suppliers
                          </Box>
                          <Box width="60%">Self Employee</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Name of Major Customers
                          </Box>
                          <Box width="60%">
                            TATA, Amazon, Spencer, Grofers, Big Baskete
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Payment terms with Customers
                          </Box>
                          <Box width="60%">Use clear communication</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Current Order Book Position
                          </Box>
                          <Box width="60%">Buyer’s side and seller’s side</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Marketing & Distribution Policy/Strategy
                          </Box>
                          <Box width="60%">Kinds of channels</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Name of Competitors
                          </Box>
                          <Box width="60%">TATA, Amazon</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Name of Major Countries where Exporting
                          </Box>
                          <Box width="60%">UAE, Taiwan, Iraq</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Domestic and export sales ratio
                          </Box>
                          <Box width="60%">25</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            No. of Employees
                          </Box>
                          <Box width="60%">350</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Other Industry specific approvals / license
                          </Box>
                          <Box width="60%">Gallops Motors Pvt. Ltd.</Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Any awards / Recognition received
                          </Box>
                          <Box width="60%">{data.awardRecognitionreceived}</Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                  <h3 className={classes.heading}>Management Details </h3>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={12}>
                      <Paper>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Name of the Partner/Director
                          </Box>
                          <Box width="60%">Mr. Prasan Surana</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            PAN No.
                          </Box>
                          <Box width="60%">AAFCK4589C</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Aadhar No.
                          </Box>
                          <Box width="60%">UDYAM-GJ-01-0016416</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            DIN / LLPIN No.
                          </Box>
                          <Box width="60%">24AAFCK4589C1ZJ</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Age
                          </Box>
                          <Box width="60%">50+</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Educational Qualification
                          </Box>
                          <Box width="60%">B.Tech</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Experience
                          </Box>
                          <Box width="60%">15+ Years</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Associate Companies
                          </Box>
                          <Box width="60%">Acute Informatics PVT.LTD</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Profit Sharing / Shareholding %
                          </Box>
                          <Box width="60%">50%</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Net Worth
                          </Box>
                          <Box width="60%">{"₹"} 440.00 Lakhs</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Resposnibilities Handled in the Comapany
                          </Box>
                          <Box width="60%">
                            <li>Managemnet</li>
                            <li>Export & Import</li>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Credit Score
                          </Box>
                          <Box width="60%">700</Box>
                        </Box>

                        <Grid container style={{ borderBottom: "solid 1px" }}>
                          <Grid item xs={2}>
                            <h6
                              style={{
                                borderRight: "solid 1px",
                                padding: "5px",
                              }}
                            >
                              Last three years Income Summary
                            </h6>
                          </Grid>
                          <Grid item xs={2}>
                            <Box
                              flexDirection="row"
                              style={{
                                borderRight: "solid 1px",
                                padding: "5px",
                              }}
                            >
                              <Box className={classes.fontTitle}>
                                First Year Summary
                              </Box>
                              <Box>1369.49</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={2}>
                            <Box
                              flexDirection="row"
                              style={{
                                borderRight: "solid 1px",
                                padding: "5px",
                              }}
                            >
                              <Box className={classes.fontTitle}>
                                Second Year Summary
                              </Box>
                              <Box>1287.83</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={2}>
                            <Box
                              flexDirection="row"
                              style={{
                                borderRight: "solid 1px",
                                padding: "5px",
                              }}
                            >
                              <Box className={classes.fontTitle}>
                                Third Year Summary
                              </Box>
                              <Box>632.84</Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                  <h3 className={classes.heading}>Collateral Details </h3>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={12}>
                      <Paper>
                        <h6
                          style={{
                            borderBottom: "solid 1px",
                            fontWeight: 700,
                          }}
                        >
                          PRIMARY SECURITY
                        </h6>

                        <Grid container style={{ borderBottom: "solid 1px" }}>
                          <Grid
                            item
                            xs={2}
                            style={{ borderRight: "solid 1px" }}
                          >
                            <Box
                              style={{
                                padding: "5px",
                                fontWeight: 600,
                              }}
                            >
                              Address of the Property
                            </Box>
                            <Box>
                              Block No. 103b Paiki, And 105 Paiki Nr Kravour
                              Foods Opp Pradip Overseas Co
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            style={{
                              borderRight: "solid 1px",
                              padding: "5px",
                            }}
                          >
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>
                                Area of the Property
                              </Box>
                              <Box>1853 Sq. Mtrs</Box>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            style={{
                              borderRight: "solid 1px",
                              padding: "5px",
                            }}
                          >
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>Owner</Box>
                              <Box>Mr. Prasan Surana </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={2} style={{ padding: "5px" }}>
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>
                                Market Value (Rs. In Crore)
                              </Box>
                              <Box>{"₹"}150.00</Box>
                            </Box>
                          </Grid>
                        </Grid>

                        <h6
                          style={{
                            borderBottom: "solid 1px",
                            fontWeight: 700,
                          }}
                        >
                          COLLATERAL SECURITY
                        </h6>
                        <Grid container style={{ borderBottom: "solid 1px" }}>
                          <Grid
                            item
                            xs={2}
                            style={{ borderRight: "solid 1px" }}
                          >
                            <Box
                              style={{
                                padding: "5px",
                                fontWeight: 600,
                              }}
                            >
                              Address of the Property
                            </Box>
                            <Box>
                              Block No. 103b Paiki, And 105 Paiki Nr Kravour
                              Foods Opp Pradip Overseas Co
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            style={{
                              borderRight: "solid 1px",
                              padding: "5px",
                            }}
                          >
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>
                                Area of the Property
                              </Box>
                              <Box>1853 Sq. Mtrs</Box>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            style={{
                              borderRight: "solid 1px",
                              padding: "5px",
                            }}
                          >
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>Owner</Box>
                              <Box>Mr. Prasan Surana </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={2} style={{ padding: "5px" }}>
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>
                                Market Value (Rs. In Crore)
                              </Box>
                              <Box>{"₹"}150.00</Box>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            Collateral Coverage
                          </Box>
                          <Box width="60%">80%</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            FACR
                          </Box>
                          <Box width="60%">22.25%</Box>
                        </Box>
                        <Box
                          display="flex"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Box width="40%" className={classes.fontTitle}>
                            ACR
                          </Box>
                          <Box width="60%">{data.acr}</Box>
                        </Box>

                        <h6
                          style={{
                            borderBottom: "solid 1px",
                            fontWeight: 700,
                          }}
                        >
                          PERSONAL GUARANTE
                        </h6>
                        <Grid container style={{ borderBottom: "solid 1px" }}>
                          <Grid
                            item
                            xs={2}
                            style={{
                              borderRight: "solid 1px",
                              padding: "5px",
                            }}
                          >
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>
                                Name of Guarantor
                              </Box>
                              <Box>Mr.Ankur P Surana</Box>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            style={{
                              borderRight: "solid 1px",
                              padding: "5px",
                            }}
                          >
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>PAN No.</Box>
                              <Box>AAFCK4589C</Box>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            style={{
                              borderRight: "solid 1px",
                              padding: "5px",
                            }}
                          >
                            <Box flexDirection="row">
                              <Box className={classes.fontTitle}>Net Worth</Box>
                              <Box>{"₹"}91.47</Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mb-30">
          <Button
            autoFocus
            className={classes.submit}
            onClick={onClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => navigate("/thankyou")}
            color="primary"
            autoFocus
            className={classes.submit}
          >
            Verify & Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
