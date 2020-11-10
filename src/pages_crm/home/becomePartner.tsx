import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import BecomePartnerImg from "assets/images/BecomePartnerImg.svg";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  BecomePartnerNameProps,
  BecomePartnerStyleProps,
  becomePartnerStyle,
} from "./style";

const useStyles = makeStyles<Theme, BecomePartnerStyleProps>(
  becomePartnerStyle
);

export const BecomePartner = () => {
  const classes: BecomePartnerNameProps = useStyles(
    {} as BecomePartnerStyleProps
  );
  return (
    <React.Fragment>
      <Container
        component={"div"}
        className={classes.wrapper + " BecomePartner"}
      >
        <Box display="flex" width={1} className={classes.BecomePartnerCover}>
          <div className="BecomePartnerImgWrap">
            <img
              alt=""
              src={BecomePartnerImg}
              className={classes.BecomePartnerImg}
            />
          </div>
          <div className={classes.content}>
            <h2>Become A Channel Partner</h2>
            <div className="text">
              Committed to the development of our client’s future with
              industrial expert growth partners who have helped us in growing
              operative resources, our network and have helped us in creating a
              transformative impact in your lives.
            </div>
          </div>
          <div className="mt-auto mb-2">
            <Button className={classes.applyButton}>Apply Now</Button>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default BecomePartner;
