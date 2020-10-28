import React from "react";
import { Container, Row, Col } from "reactstrap";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  CoreProductsNameProps,
  CoreProductsStyleProps,
  coreProductsStyle,
} from "./style";
import {
  SMELoanIcon,
  ConstructionFinanceIcon,
  BusinessLoanIcon,
  RetailHomeLoanIcon,
  RetailLAPIcon,
  GovtSubsidaryIcon,
  FireInsuranceIcon,
  LifeInsuranceIcon,
  PersonalLoanIcon,
  HealthInsuranceIcon,
  LiabilityInsuranceIcon,
  MotorInsuranceIcon,
} from "./icons";

const useStyles = makeStyles<Theme, CoreProductsStyleProps>(coreProductsStyle);

function CoreProducts() {
  const classes: CoreProductsNameProps = useStyles(
    {} as CoreProductsStyleProps
  );
  return (
    <Container className={classes.wrapper + " CoreProducts"} fluid={true}>
      <Row>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{SMELoanIcon}</div>
            <div className={classes.productName + " product-name"}>
              SME Loan
            </div>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{ConstructionFinanceIcon}</div>
            <div className={classes.productName + " product-name"}>
              Construction Finance
            </div>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{BusinessLoanIcon}</div>
            <div className={classes.productName + " product-name"}>
              Business Loan
            </div>
          </div>
        </Col>

        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{RetailHomeLoanIcon}</div>
            <div className={classes.productName + " product-name"}>
              Retail Home Loan
            </div>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{RetailLAPIcon}</div>
            <div className={classes.productName + " product-name"}>
              Retail LAP
            </div>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{GovtSubsidaryIcon}</div>
            <div className={classes.productName + " product-name"}>
              Government Subsidy
            </div>
          </div>
        </Col>

        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{FireInsuranceIcon}</div>
            <div className={classes.productName + " product-name"}>
              Fire Insurance
            </div>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{LifeInsuranceIcon}</div>
            <div className={classes.productName + " product-name"}>
              Life Insurance
            </div>
            <span className={classes.productTag + " product-tag"}>
              Covid-19 Covered
            </span>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{PersonalLoanIcon}</div>
            <div className={classes.productName + " product-name"}>
              Personal Loan
            </div>
          </div>
        </Col>

        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{HealthInsuranceIcon}</div>
            <div className={classes.productName + " product-name"}>
              Health Insurance
            </div>
            <span className={classes.productTag + " product-tag"}>
              Covid-19 Covered
            </span>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{LiabilityInsuranceIcon}</div>
            <div className={classes.productName + " product-name"}>
              Liability Insurance
            </div>
          </div>
        </Col>
        <Col className={classes.customCol}>
          <div className={classes.productWrapper + " product-wrap"}>
            <div className="product-icon">{MotorInsuranceIcon}</div>
            <div className={classes.productName + " product-name"}>
              Motor Insurance
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default CoreProducts;
