import { MetaDataType } from "components/dyanmicForm";

const GeneralDetailsMetaData: MetaDataType = {
  form: {
    name: "123456",
    label: "General Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        "0": "Address Details",
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
      inputMask: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "dummy",
      label: "dummy",
      options: [
        { value: "1", label: "Yes" },
        { value: "2", label: "No" },
      ],
      GridProps: {
        xs: 3,
        md: 3,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "arrayField",
        group: 0,
      },
      name: "addressDetails",
      dependentFields: ["dummy"],
      shouldExclude: "shouldExcludeDummy",
      fixedRows: true,
      getFixedRowsCount: 2,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "textField",
          },
          name: "value1",
          label: "Value1",
          placeholder: "Value1",
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
          name: "value2",
          label: "Value2",
          placeholder: "Value2",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
          },
          name: "value3",
          label: "Value3",
          placeholder: "Value3",
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
          name: "total",
          label: "Total",
          placeholder: "Total",
          dependentFields: ["value1", "value2", "value3"],
          setValueOnDependentFieldsChange: "setValueOnDependentFieldsChangeOne",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
          },
          name: "country",
          label: "Country",
          placeholder: "Country",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },

    {
      render: {
        componentType: "textField",
      },
      name: "totalMonthLeasePeriod",
      type: "number",
      maxLength: 3,
      defaultValue: 360,
      label: "Total Month Lease Period In Months",
      placeholder: "Total Month Lease Period In Months",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "momnthPassed",
      maxLength: 3,
      defaultValue: 0,
      label: "Months Passsed",
      placeholder: "Months Passsed",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "balanceLeasePeriodRem",
      maxLength: 3,
      label: "Balance Lease period remaining",
      placeholder: "Balance Lease period remaining",
      dependentFields: ["totalMonthLeasePeriod", "momnthPassed"],
      setValueOnDependentFieldsChange:
        "retailLRDCalculateBalanceLeasePeriodRemaining",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "rentReviFrequency",
      label: "Rent Revision Frequency",
      placeholder: "Rent Revision Frequency",
      defaultValue: 12,
      //@ts-ignore
      maxLenght: 2,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "rentReviMonth",
      //@ts-ignore
      maxLenght: 2,
      label: "Rent Revision Month",
      placeholder: "Rent Revision Month",
      dependentFields: ["rentReviFrequency", "momnthPassed"],
      setValueOnDependentFieldsChange: "retailLRDCalculateRentRevisionMonths",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "propertyType",
      label: "Property Type",
      //@ts-ignore
      options: "getPropertyType",
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
      name: "propertyValue",
      label: "Property Value",
      defaultValue: 70000000,
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
      dependentFields: ["propertyType"],
      setValueOnDependentFieldsChange: "retailLRDCalculatecalLTV",
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
      label: "Loan Based on LTV",
      placeholder: "Loan Based on LTV",
      dependentFields: ["propertyValue", "ltv"],
      setValueOnDependentFieldsChange:
        "retailLRDCalculatecalLoanAmountBasedOnLTV",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
export default GeneralDetailsMetaData;
