import { MetaDataType } from "components/dyanmicForm/types";

export const CC_ODMetaData: MetaDataType = {
  form: {
    name: "smeLoanCC-OD",
    label: "SME Loans CC-OD",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "General Details",
        1: "Business Details ",
        2: "Management Details",
        3: "Financial Ratios",
        4: "Collateral Details",
      },
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "addOffice",
      label: "Office Address",
      multiline: true,
      rowsMax: 3,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["Office Address is required"] }],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "datePicker",
        group: 0,
      },
      name: "inception_date",
      label: "Date of Incorporation",
      // required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "proposedBusiness",
      label: "Proposed Business",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["This field is required"] }],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "externalCreditRating",
      label: "External Credit Rating",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Rating", value: "0" },
              { label: "CRISIL A+", value: "A+" },
              { label: "CRISIL AA+", value: "AA+" },
              { label: "CRISIL B+", value: "B+" },
              { label: "CRISIL BB+", value: "BB+" },
              { label: "CRISIL C+", value: "C+" },
              { label: "CRISIL D+", value: "D+" },
            ]);
          }, 1000);
        });
      },
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "msme",
      label: "Micro, Small or Medium ",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "aadharCard",
        group: 0,
      },
      name: "aadharNumber",
      type: "text",
      label: "Udhyog Aadhar Number",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "promotersDirectorsName",
      label: "Name of Promoters / Directors",
      // required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "loanAmount",
      type: "text",
      label: "Loan amount (Rs.)",
      // required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Enter Loan amount"] },
          { name: "required", params: ["Enter Loan amount"] },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "loanDetails",
      label: "Loan details",

      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Loan details", value: "0" },
              { label: "Present", value: "Pre" },
              { label: "Proposed", value: "Pro" },
            ]);
          }, 1000);
        });
      },
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "natureOfFacility",
      label: "Nature of Facility",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["This field is required"] }],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (
          dependentValues?.loanDetails?.value === "Pre" ||
          dependentValues?.loanDetails?.value === "Pro"
        ) {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "bankName",
      label: "Name of Bank ",
      // required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.loanDetails?.value === "Pre") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "outstandingAmount",
      type: "text",
      label: "O/s Amount as on ",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "typeError", params: ["This field is required"] },
      //     { name: "required", params: ["This field is required"] },
      //   ],
      // },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.loanDetails?.value === "Pre") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
        group: 0,
      },
      name: "rateOfInterest",
      type: "text",
      label: "Rate of Interest",
      // required: true,
      // validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.loanDetails?.value === "Pre") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "newTakeover",
      label: "New / Takeover",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["This field is required"] }],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.loanDetails?.value === "Pro") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "requestedROI",
      label: "Requested ROI",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["This field is required"] }],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.loanDetails?.value === "Pro") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "proposedAmount",
      type: "text",
      label: "Amount",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "typeError", params: ["This field is required"] },
      //     { name: "required", params: ["This field is required"] },
      //   ],
      // },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.loanDetails?.value === "Pro") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "presentProposedLoancomments",
      label: "Comments",
      // required: true,
      type: "text",
      multiline: true,
      rowsMax: 3,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["This field is required"] }],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["loanDetails"],
      shouldExclude: (_, dependentValues) => {
        if (
          dependentValues?.loanDetails?.value === "Pre" ||
          dependentValues?.loanDetails?.value === "Pro"
        ) {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "loanPurpose",
      label: "Purpose of Loan",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["This field is required"] }],
      // },
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Purpose of Loan", value: "0" },
              { label: "For Working Capital Requirement ", value: "01" },
              {
                label: "For New Project – For Construction of building",
                value: "02",
              },
              { label: "For purchase of Machineries", value: "03" },
              { label: "Other Input Option", value: "04" },
            ]);
          }, 1000);
        });
      },
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
        group: 0,
      },
      name: "chequeBounce",
      type: "text",
      placeholder: "if any and % of total Cheque bounce",
      label: "Inward cheque bounces",
      // required: true,
      // validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    //business details

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "companyHistory",
      label: "Brief history of the Company",
      multiline: true,
      rowsMax: 3,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "existingProducts",
      label: "Existing Products / Services of the company ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "productEndUse",
      label: "End Use of the Products",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "majorSuppliers",
      label: "Name of Major Suppliers",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "paymenttermSupplier",
      label: "Payment terms with Supplier",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "majorCustomers",
      label: "Name of Major Customers",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "paymenttermCustomer",
      label: "Payment terms with Customers",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "currentOrderPosition",
      label: "Current Order Book Position",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "marketingDistributionPolicy/Strategy",
      label: "Marketing & Distribution Policy/Strategy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "competitorsName",
      label: "Name of Competitors ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "exportingCountries",
      label: "Name of Major Countries where Exporting",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "domesticExportSalesRatio",
      label: "Domestic and export sales ratio",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "employeeNumbers",
      label: "No. of Employees",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "industryApprovalsAndLicense",
      label: "Other Industry specific approvals / license",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "awardRecognitionreceived",
      label: "Any awards / Recognition received ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    //management

    {
      render: {
        //@ts-ignore
        componentType: "panCard",
        group: 2,
      },
      name: "managementPanNumber",
      type: "text",
      label: "PAN Card Number",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "aadharCard",
        group: 2,
      },
      name: "managementAadharNumber",
      type: "text",
      label: "Aadhar Card Number",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 2,
      },
      name: "age",
      label: "Age",
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Age", value: "0" },
              { label: "18 yrs", value: "01" },
              { label: "25 yrs", value: "02" },
              { label: "26 yrs ", value: "03" },
              { label: "35 yrs yes", value: "04" },
            ]);
          }, 1000);
        });
      },
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 2,
      },
      name: "education_qualifi",
      label: "Education Qualification",
      placeholder: "Education qualification",
      defaultValue: "0",
      //@ts-ignore
      options: "getEducationDtl",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 2,
      },
      name: "experience",
      label: "Experience",
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getProfessionYears",
      validate: "getValidateValue",
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "associateCompanies",
      label: "Associate Companies",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
        group: 2,
      },
      name: "profitSharingAndShareHolding",
      type: "text",
      label: "Profit Sharing / Shareholding %",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "firstYearSummary",
      label: "Previous First Year Income Summary",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "secondYearSummary",
      label: "Previous Second Year Income Summary",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "thirdYearSummary",
      label: "Previous Third Year Income Summary",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    //financial

    {
      render: {
        componentType: "textField",
        group: 3,
      },
      name: "firstYearSummary",
      label: "Next One Year Income Summary",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 3,
      },
      name: "secondYearSummary",
      label: "Next Second Year Income Summary",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    //Collateral

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "primarySecurityOfficeAddress",
      label: "Address of the Property for Primary Security",
      multiline: true,
      rowsMax: 3,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "primarySecurityPropertyArea",
      label: "Area of the Property for Primary Security",
      placeholder: "in Square meter",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "primarySecurityOwnerName",
      label: "Owner Name for Primary Security",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 4,
      },
      name: "primarySecurityMarketValue",
      label: "Market Value (Rs. In Crore) for Primary Security",
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "collateralSecurityOfficeAddress",
      label: "Address of the Property for collateral Security",
      multiline: true,
      rowsMax: 3,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "collateralSecurityPropertyArea",
      label: "Area of the Property for collateral Security",
      placeholder: "in Square meter",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "collateralSecurityOwnerName",
      label: "Owner Name for Collateral Security",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "facr",
      label: "FACR",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "acr",
      label: "ACR",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 4,
      },
      name: "collateralSecurityMarketValue",
      label: "Market Value (Rs. In Crore) for Collateral Security",
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "guarantorName",
      label: "Name of Guarantor for Personal Guarantee",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "panCard",
        group: 4,
      },
      name: "panNumberofGuarantor",
      type: "text",
      label: "PAN Card Number of Guarantor",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 4,
      },
      name: "guarantorNetWorth",
      label: "Net Worth for Personal Guarantee",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
