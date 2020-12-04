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
  navigationProps?: any;
}

const productTiles: ProductTilesType[] = [
  {
    productIcon: SMELoanIcon,
    productName: "SME Loan",
    href: "/form/sme",
    navigationProps: {
      prodCode: "12300005",
      empCode: "98",
    },
  },
  {
    productIcon: ConstructionFinanceIcon,
    productName: "Construction Finance",
    href: "/form/infra",
    navigationProps: {
      prodCode: "123000011",
      empCode: "98",
    },
  },
  {
    productIcon: BusinessLoanIcon,
    productName: "Business Loan",
    href: "/form/business",
    navigationProps: {
      prodCode: "123000013",
      empCode: "98",
    },
  },
  {
    productIcon: RetailHomeLoanIcon,
    productName: "Retail Home Loan",
    href: "/form/rhl",
    navigationProps: {
      prodCode: "12300001",
      empCode: "98",
    },
  },
  {
    productIcon: RetailLAPIcon,
    productName: "Retail LAP",
    href: "/form/lap",
    navigationProps: {
      prodCode: "12300002",
      empCode: "98",
    },
  },
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
    href: "/form/personal",
    navigationProps: {
      prodCode: "123000014",
      empCode: "98",
    },
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
      <Row
        className={classes.productRow + " product-row"}
        xs="1"
        sm="3"
        md="4"
        lg="6"
      >
        {productTiles.map((one) => {
          return (
            <Col
              key={one.productName}
              className={classes.customCol + " product-col"}
            >
              <div
                className={classes.productWrapper + " product-wrap"}
                onClick={(e) => {
                  e.preventDefault();
                  if (one.href !== undefined) {
                    navigate(one.href, {
                      state: { ...one.navigationProps },
                    });
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
