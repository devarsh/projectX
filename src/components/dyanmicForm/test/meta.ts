const GeneralDetailsMetaData = {
  form: {
    name: "coApplicant",
    label: "Co-Applicant Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        "0": "Basic Details",
        "1": "Income and Obligation",
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
      render: { componentType: "textField", group: 0 },
      name: "condition",
      type: "text",
      label: "Condition",
      placeholder: "Condition",
      GridProps: { xs: 12, md: 3, sm: 3 },
      setColor: "red",
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "relation",
      label: "Relation",
      //@ts-ignore
      options: "getNomineeRelation",
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
      name: "salutation",
      label: "Salutation",
      //@ts-ignore
      options: "getSalutation",
      //@ts-ignore
      postValidationSetCrossFieldValues: "getGenderValue",
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
      name: "gender",
      label: "Gender",
      placeholder: "Gender",
      //@ts-ignore
      options: "getGenderList",
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
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      maxLength: 150,
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
      name: "middleName",
      label: "Middle Name",
      placeholder: "Middle Name",
      maxLength: 150,
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
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      maxLength: 150,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "dob",
        group: 0,
      },
      name: "birthDate",
      label: "BirthDate",
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "phoneNumber",
        group: 0,
      },
      name: "mobileNo",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile No",
      required: true,
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
      name: "emailID",
      type: "email",
      label: "Email",
      placeholder: "Email",
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Email is required."],
          },
          {
            name: "email",
            params: ["Please enter Email ID."],
          },
        ],
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
        group: 0,
      },
      name: "address1",
      label: "Address Line 1",
      placeholder: "Address Line 1",
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
      name: "address2",
      label: "Address Line 2",
      placeholder: "Address Line 2",
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
      name: "landmark",
      label: "Landmark",
      placeholder: "Landmark",
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
        componentType: "pincode",
        group: 0,
      },
      name: "pincode",
      label: "Residence Pincode",
      placeholder: "Residence pincode",
      required: true,
      defaultValue: "",
      //@ts-ignore
      postValidationSetCrossFieldValues: "postValidationSetPincodeDtl",
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
      name: "location",
      label: "Location",
      placeholder: "Location",
      dependentFields: ["pincode"],
      required: true,
      //@ts-ignore
      options: "getPincode",
      defaultValue: "0",
      runPostValidationHookAlways: true,
      //@ts-ignore
      postValidationSetCrossFieldValues: "postValidationSetLocationDtl",
      disableCaching: true,
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
      name: "city",
      label: "City",
      placeholder: "City",
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
      name: "district",
      label: "District",
      placeholder: "District",
      isReadOnly: true,
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
      name: "state",
      label: "State",
      placeholder: "State",
      isReadOnly: true,
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
      name: "country",
      label: "Country",
      placeholder: "Country",
      isReadOnly: true,
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
        group: 0,
      },
      name: "income",
      label: "Income",
      placeholder: "Income",
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
      name: "employeeCode",
      label: "Employement Type",
      placeholder: "Employement Type",
      //@ts-ignore
      options: "getRetailEmployee",
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
        group: 0,
      },
      name: "obligations",
      label: "Obligations",
      placeholder: "Obligations",
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
        group: 0,
      },
      name: "actualObligations",
      label: "Actual Obligations",
      placeholder: "Actual Obligations",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "employementType",
      label: "Employement Type",
      placeholder: "Employement Type",
      //@ts-ignore
      options: [
        { label: "Select Option", value: "00" },
        { label: "Self Employed", value: "01" },
        { label: "Salaried", value: "02" },
      ],
      defaultValue: "00",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "arrayField",
        group: 1,
      },
      name: "returnFilingDetails",
      removeRowFn: "deleteFormArrayFieldData",
      arrayFieldIDName: "lineNo",
      fixedRows: true,
      getFixedRowsCount: 2,
      dependentFields: ["employementType"],
      shouldExclude: "ShouldExcludeShowRetailCoApplicantSelEmployeed",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "lineNo",
        },
        {
          render: {
            componentType: "textField",
          },
          name: "filingYear",
          label: "Filing Year",
          placeholder: "Filing Year",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "datePicker",
          },
          name: "filingDate",
          label: "Filing Date",
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
            //@ts-ignore
            componentType: "currencyWithoutWords",
          },
          name: "netProfit",
          label: "Net Profit",
          placeholder: "Net Profit",
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
          name: "depreciation",
          label: "Depreciation",
          placeholder: "Depreciation",
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
          name: "otherIncome",
          label: "Other Income",
          placeholder: "Other Income",
          defaultValue: "00",
          //@ts-ignore
          options: "getOtherSourceIncome",
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
          name: "otherIncomeType",
          label: "Other Income Type",
          placeholder: "Total Income Type",
          dependentFields: ["otherIncome"],
          shouldExclude: "ShouldExcludeShowRetailOtherIncomeTypeField",
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
          name: "otherIncomeAmount",
          label: "Other Income Amount",
          placeholder: "Other Income Amount",
          dependentFields: ["otherIncome"],
          shouldExclude: "ShouldExcludeShowRetailOtherIncomeAmountField",
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
          dependentFields: [
            "netSalary",
            "variablePay",
            "bonus",
            "incentive",
            "agricultureIncome",
            "otherAllowances",
            "otherIncomeAmount",
          ],
          setValueOnDependentFieldsChange: "setValueOnDependentFieldsChangeOne",
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
        //@ts-ignore
        componentType: "arrayField",
        group: 1,
      },
      name: "salaryDetails",
      fixedRows: true,
      getFixedRowsCount: 1,
      dependentFields: ["employementType"],
      shouldExclude: "ShouldExcludeShowRetailCoApplicantSalaried",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "lineNo",
        },
        {
          render: {
            //@ts-ignore
            componentType: "datePicker",
          },
          name: "salaryMonth",
          label: "Salary Month",
          placeholder: "mm/yyyy",
          format: "MM/yyyy",
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
          name: "netSalary",
          label: "Net Monthly Salary",
          placeholder: "Net Monthly Salary",
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
          name: "variablePay",
          label: "Variable Pay - 50%",
          placeholder: "Variable Pay - 50%",
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
          name: "bonus",
          label: "Bonus - 50% of CY",
          placeholder: "Bonus - 50% of CY",
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
          name: "incentive",
          label: "Incentive",
          placeholder: "Incentive",
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
          name: "agricultureIncome",
          label: "Agriculture Income - 20%",
          placeholder: "Agriculture Income - 20%",
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
          name: "otherAllowances",
          label: "Other Allowances",
          placeholder: "Other Allowances",
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
          name: "otherIncome",
          label: "Other Income",
          placeholder: "Other Income",
          defaultValue: "00",
          //@ts-ignore
          options: "getOtherSourceIncome",
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
          name: "otherIncomeType",
          label: "Other Income Type",
          placeholder: "Total Income Type",
          dependentFields: ["otherIncome"],
          shouldExclude: "ShouldExcludeShowRetailSalaryOtherIncomeTypeField",
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
          name: "otherIncomeAmount",
          label: "Other Income Amount",
          placeholder: "Other Income Amount",
          dependentFields: ["otherIncome"],
          shouldExclude: "ShouldExcludeShowRetailSalaryOtherIncomeAmountField",
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
          dependentFields: [
            "netSalary",
            "variablePay",
            "bonus",
            "incentive",
            "agricultureIncome",
            "otherAllowances",
            "otherIncomeAmount",
          ],
          setValueOnDependentFieldsChange: "setValueOnDependentFieldsChangeOne",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: { componentType: "textField", group: 0 },
          name: "condition",
          type: "text",
          label: "Condition",
          placeholder: "Condition",
          GridProps: { xs: 12, md: 3, sm: 3 },
          setColor: "dummyColor",
        },
        {
          render: { componentType: "inputMask", group: 0 },
          name: "yaer",
          label: "yearMasked",
          placeholder: "yyyy-yyyy",
          formattedValue: true,
          MaskProps: {
            mask: "0000`-0000`",
            lazy: true,
          },
          GridProps: { xs: 12, md: 3, sm: 3 },
        },
        {
          render: { componentType: "inputMask", group: 0 },
          name: "clfr2",
          label: "CLFR",
          placeholder: "CLFR",
          formattedValue: false,
          MaskProps: {
            mask: "0000` 0000` 0000",
            lazy: true,
          },
          GridProps: { xs: 12, md: 3, sm: 3 },
        },
      ],
    },
  ],
};
export default GeneralDetailsMetaData;
