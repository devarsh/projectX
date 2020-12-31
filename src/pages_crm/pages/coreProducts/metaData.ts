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
} from "assets/icons/productIcons";

interface ProductTilesType {
  productIcon: JSX.Element;
  productName: string;
  covidCovered?: boolean;
  href?: string;
  navigationProps?: any;
}

export const productTilesMeta: ProductTilesType[] = [
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
