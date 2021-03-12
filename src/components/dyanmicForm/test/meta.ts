import { MetaDataType } from "components/dyanmicForm";

const GeneralDetailsMetaData: MetaDataType = {
  form: {
    refID: 1667,
    name: "12300001",
    label: "Applicant Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "simple",

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
      inputMask: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        //@ts-ignore
        componentType: "currency",
        group: 0,
      },
      name: "totalObligations",
      label: "Obligations",
      placeholder: "Obligations",
      defaultValue: 15000,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "totalActualObligations",
      label: "Actual Obligations",
      placeholder: "Actual Obligations",
      defaultValue: 30000,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "totalIncome",
      label: "Total Income",
      placeholder: "Total Income",
      defaultValue: 100000,
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
      },
      name: "foir",
      label: "FOIR",
      placeholder: "FOIR",
      defaultValue: 65,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "loanAmount",
      label: "Loan Amount",
      placeholder: "Loan Amount",
      defaultValue: 3000000,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "tenur",
      label: "Tenur",
      placeholder: "Tenur",
      defaultValue: 240,
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
      },
      name: "rate",
      label: "Rate",
      placeholder: "Rate",
      defaultValue: 9.5,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "propertyMarketValue",
      label: "Market Value of Property",
      placeholder: "Market Value of Property",
      defaultValue: 6000000,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "eligibleEMI",
      label: "Eligible EMI",
      placeholder: "Eligible EMI",
      isReadOnly: true,
      dependentFields: ["totalIncome", "foir", "totalActualObligations"],
      setValueOnDependentFieldsChange: "retailCalculateEligibleEMI",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "loanAmountBasedOnFOIR",
      label: "Loan Amount Based on FOIR",
      placeholder: "Loan Amount Based on FOIR",
      dependentFields: ["rate", "tenur", "eligibleEMI"],
      setValueOnDependentFieldsChange: "retailCalculateLoanAmountBasedOnFOIR",
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
      },
      name: "ltv",
      label: "LTV",
      placeholder: "LTV",
      dependentFields: ["propertyMarketValue"],
      setValueOnDependentFieldsChange: "retailCalculateLTV",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "loanAmountBasedOnLTV",
      label: "Loan Amount Based On LTV",
      placeholder: "Loan Amount Based On LTV",
      dependentFields: ["ltv", "propertyMarketValue"],
      setValueOnDependentFieldsChange: "retailCalculateLoanAmountBasedOnLTV",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "loanAmountBasedOnFOIRLTV",
      label: "Loan Amount Based On FOIR and LTV",
      placeholder: "Loan Amount Based On FOIR and LTV",
      dependentFields: ["loanAmountBasedOnFOIR", "loanAmountBasedOnLTV"],
      setValueOnDependentFieldsChange:
        "retailCalculateLoanAmountBasedOnFOIRLTV",
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
      },
      name: "eligibileLoanAmountDif",
      label: "Difference Between Applied and Eligible Loan Amount",
      placeholder: "Difference Between Applied and Eligible Loan Amount",
      dependentFields: ["loanAmount", "loanAmountBasedOnFOIRLTV"],
      setValueOnDependentFieldsChange:
        "retailCalculateEligibileLoanAmountDifference",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "eligibleLoanAmount",
      label: "Eligible Loan Amount",
      placeholder: "Eligible Loan Amount",
      dependentFields: ["loanAmountBasedOnFOIRLTV"],
      setValueOnDependentFieldsChange: "retailSetEligibleLoanAmount",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};

export default GeneralDetailsMetaData;
