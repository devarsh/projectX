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
import { useNavigate } from "react-router-dom";

interface ProductTilesType {
  productIcon: JSX.Element;
  productName: string;
  covidCovered?: boolean;
  href?: string;
  formCode?: string;
}

const productTiles: ProductTilesType[] = [
  { productIcon: SMELoanIcon, productName: "SME Loan" },
  { productIcon: ConstructionFinanceIcon, productName: "Construction Finance" },
  { productIcon: BusinessLoanIcon, productName: "Business Loan" },
  { productIcon: RetailHomeLoanIcon, productName: "Retail Home Loan" },
  { productIcon: RetailLAPIcon, productName: "Retail LAP" },
  { productIcon: GovtSubsidaryIcon, productName: "Government Subsidy" },
  { productIcon: FireInsuranceIcon, productName: "Fire Insurance" },
  {
    productIcon: LifeInsuranceIcon,
    productName: "Life Insurance",
    covidCovered: true,
  },
  {
    productIcon: PersonalLoanIcon,
    productName: "Personal Loan",
  },
  {
    productIcon: HealthInsuranceIcon,
    productName: "Health Insurance",
    covidCovered: true,
  },
  {
    productIcon: LiabilityInsuranceIcon,
    productName: "Liability Insurance",
  },
  {
    productIcon: MotorInsuranceIcon,
    productName: "Motor Insurance",
  },
];

const useStyles = makeStyles<Theme, CoreProductsStyleProps>(coreProductsStyle);

function CoreProducts() {
  const classes: CoreProductsNameProps = useStyles(
    {} as CoreProductsStyleProps
  );
  const navigate = useNavigate();
  return (
    <Container className={classes.wrapper + " CoreProducts"} fluid={true}>
      <Row>
        {productTiles.map((one) => {
          return (
            <Col key={one.productName} className={classes.customCol}>
              <div
                className={classes.productWrapper + " product-wrap"}
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    one.formCode !== undefined &&
                    one.href !== undefined &&
                    Boolean(one.href) &&
                    Boolean(one.formCode)
                  ) {
                    navigate(one.href, { state: { formCode: one.formCode } });
                  }
                }}
              >
                <div className="product-icon">{one.productIcon}</div>
                <div className={classes.productName + " product-name"}>
                  {one.productName}
                </div>
                {Boolean(one.covidCovered) ? (
                  <span className={classes.productTag + " product-tag"}>
                    Covid-19 Covered
                  </span>
                ) : null}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default CoreProducts;
