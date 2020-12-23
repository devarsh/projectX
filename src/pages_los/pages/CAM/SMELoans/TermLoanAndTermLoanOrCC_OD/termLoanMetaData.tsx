import { MetaDataType } from "components/dyanmicForm/types";

export const TermLoanMetaData: MetaDataType = {
  form: {
    name: "smeLoanCC-OD",
    label: "SME Loans CC-OD",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "tabs",
      tabs: [
        "General Details",
        "Business Details ",
        "Project Details",
        "Management Details",
        "Financial Ratios",
        "Collateral Details",
      ],
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
      },
      name: "udhyogAadharNumber",
      type: "text",
      label: "Udhyog Aadhar No:",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 0,
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
        tab: 1,
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
        tab: 1,
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
        tab: 1,
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
        tab: 1,
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
        tab: 1,
      },
      name: "paymentTermCustomer",
      label: "Payment terms with Suppliers",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 1,
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
        tab: 1,
      },
      name: "paymentTermCustomer",
      label: "Payment terms with Customers",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    // {
    //   render: {
    //     componentType: "textField",
    //     tab: 1,
    //   },
    //   name: "paymenttermSupplier",
    //   label: "Payment terms with Supplier",
    //   GridProps: {
    //     xs: 12,
    //     md: 3,
    //     sm: 3,
    //   },
    // },

    {
      render: {
        componentType: "textField",
        tab: 1,
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
        tab: 1,
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
        tab: 1,
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
        tab: 1,
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
        tab: 1,
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
        tab: 1,
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
        tab: 1,
      },
      name: "gpcbLicense",
      label: "GPCB License ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 1,
      },
      name: "factoryLicense",
      label: "Factory License ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 1,
      },
      name: "fassaiLicense",
      label: "FASSAI License ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 1,
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
        tab: 1,
      },
      name: "awardRecognitionreceived",
      label: "Any awards / Recognition received ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    //project details

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "projectLocation",
      label: "Location of the project ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        tab: 2,
      },
      name: "landDetails",
      label: "Land Details ",
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Land Details", value: "0" },
              { label: "own", value: "O" },
              { label: "Rented", value: "R" },
            ]);
          }, 1000);
        });
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "projectArea",
      label: "Area of the Project Land and approx valuation",
      placeholder: "in Sq.meter",
      multiline: true,
      rowsMax: 3,
      dependentFields: ["landDetails"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.landDetails?.value === "O") {
          return false;
        }
        return true;
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "datePicker",
        tab: 2,
      },
      name: "commencementDate",
      label: "Expected Date of Commencement (DCCO)",
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
        componentType: "numberFormat",
        tab: 2,
      },
      name: "totalCostOfProject",
      type: "text",
      label: "Amount Incurred(In Lacs) for Total Cost of Project",
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
        tab: 2,
      },
      name: "particularMeansOfFinance",
      label: "Particulars for Total Cost of Project",
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Particulars", value: "0" },
              { label: "Promoter’s Contribution", value: "01" },
              { label: "Term Loan", value: "02" },
              { label: "Unsecured Loan ", value: "03" },
            ]);
          }, 1000);
        });
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
        tab: 2,
      },
      name: "amountMeansOfFinance",
      type: "text",
      label: "Total Amount (In Lacs) for Total Cost of Project",
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
        tab: 2,
      },
      name: "particularCostOfProject",
      label: "Particulars for Total Means of Finance ",
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Particulars", value: "0" },
              { label: "Factory building", value: "01" },
              { label: "Plant & Machinery – Domestic", value: "02" },
              { label: "Plant & Machinery – Imported", value: "03" },
              { label: "Electrification", value: "04" },
              { label: "Interest During Construction Period", value: "05" },
            ]);
          }, 1000);
        });
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
        tab: 2,
      },
      name: "totalMeansOfFinance",
      type: "text",
      label: "Amount Incurred(In Lacs) for Total Means of Finance ",
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
        componentType: "numberFormat",
        tab: 2,
      },
      name: "amountCostOfProject",
      type: "text",
      label: "Total Amount (In Lacs) for Total Means of Finance ",
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
        componentType: "textField",
        tab: 2,
      },
      name: "projectCurrentStage",
      label: "Current Stage of Project ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "moratorium",
      label: "Moratorium",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "installmentsOrBalloonig",
      label: "Equal Installments or Balloonig ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "macineriesList",
      label: "List of Machineries ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "installedCapacity",
      label: "Installed Capacity ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "manufacturedProducts",
      label: "Products to be manufactured",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "manufacturingProcess",
      label: "Manufacturing Process",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "requirementArrangementofPower",
      label: "Requirement and arrangement of Power",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "requirementArrangementofWater",
      label: "Requirement and arrangement of Water",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "requirementArrangementofEmployees",
      label: "Requirement and arrangement of Employees",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "technicalPersonPlanManagerBrief",
      label: "Brief about Technical Person / Plant manager",
      multiline: true,
      rowsMax: 4,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "unitMatrix ",
      label: "Unit Matrix ",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 2,
      },
      name: "projectedTurnOverAndProfit",
      label: "Projected Turnover & Profit",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    //management

    {
      render: {
        componentType: "textField",
        tab: 3,
      },
      name: "dinOrLLPINNumber",
      label: "DIN / LLPIN No.",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        tab: 3,
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
        tab: 3,
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
        tab: 3,
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
        tab: 3,
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
        tab: 3,
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
        tab: 3,
      },
      name: "netWorth",
      label: "Networth",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        tab: 3,
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
        tab: 3,
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
        tab: 3,
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
        tab: 4,
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
        tab: 4,
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
        tab: 5,
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
        tab: 5,
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
        tab: 5,
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
        tab: 5,
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
        tab: 5,
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
        tab: 5,
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
        tab: 5,
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
        componentType: "numberFormat",
        tab: 5,
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
        tab: 5,
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
        tab: 5,
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
        componentType: "textField",
        tab: 5,
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
        tab: 5,
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
        tab: 5,
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
