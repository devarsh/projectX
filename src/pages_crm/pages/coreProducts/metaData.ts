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
    href: "./form/sme",
    navigationProps: {
      metaProps: {
        categoryID: "12000002",
        productID: "12300005",
        action: "crm_inquiry_metaData",
      },
    },
  },
  {
    productIcon: ConstructionFinanceIcon,
    productName: "Construction Finance",
    href: "./form/infra",
    navigationProps: {
      metaProps: {
        categoryID: "12000003",
        productID: "123000011",
        action: "crm_inquiry_metaData",
      },
    },
  },
  {
    productIcon: BusinessLoanIcon,
    productName: "Business Loan",
    href: "./form/business",
    navigationProps: {
      metaProps: {
        categoryID: "12000004",
        productID: "123000013",
        action: "crm_inquiry_metaData",
      },
    },
  },
  {
    productIcon: RetailHomeLoanIcon,
    productName: "Retail Home Loan",
    href: "./form/rhl",
    navigationProps: {
      metaProps: {
        categoryID: "12000001",
        productID: "12300001",
        action: "crm_inquiry_metaData",
      },
    },
  },
  {
    productIcon: RetailLAPIcon,
    productName: "Retail LAP",
    href: "./form/lap",
    navigationProps: {
      metaProps: {
        categoryID: "12000001",
        productID: "12300002",
        action: "crm_inquiry_metaData",
      },
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
    href: "./form/personal",
    navigationProps: {
      metaProps: {
        categoryID: "12000004",
        productID: "123000014",
        action: "crm_inquiry_metaData",
      },
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
