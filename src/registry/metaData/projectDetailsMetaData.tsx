import { MetaDataType } from "components/dyanmicForm/types";
export const ProjectDetailsMetadata: MetaDataType = {
  form: {
    name: "projectDetails",
    label: "Project Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: { 0: "Basic Details", 1: "Project Particular Details" },
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
        componentType: "textField",
        group: 0,
      },
      name: "landLocation",
      label: "Location of the project",
      placeholder: "Location of the project",
      defaultValue: "",
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
      name: "landDetails",
      label: "Land Details",
      placeholder: "Land Details",
      defaultValue: "",
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
      name: "landAreaApproxValuation",
      label: "Area of the Project Land and approx valuation",
      placeholder: "Area of the Project Land and approx valuation",
      defaultValue: "",
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
      name: "commencementDate",
      label: "Expected Date of Commencement (DCCO)",
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
        componentType: "textField",
        group: 0,
      },
      name: "currentLandStage",
      label: "Current Stage of Project",
      placeholder: "Current Stage of Project",
      defaultValue: "",
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
      name: "maratorium",
      label: "Moratorium",
      placeholder: "Moratorium",
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
      name: "installmentBallooning",
      label: "Equal Installments or Balloonig",
      placeholder: "Equal Installments or Balloonig",
      defaultValue: "",
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
      name: "machineryList",
      label: "List of Machineries",
      placeholder: "List of Machineries",
      defaultValue: "",
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
      name: "installedCapacity",
      label: "Installed Capacity",
      placeholder: "Installed Capacity",
      defaultValue: "",
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
      name: "productManufactured",
      label: "Products to be manufactured",
      placeholder: "Products to be manufactured",
      defaultValue: "",
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
      name: "manufacturingProcess",
      label: "Manufacturing Process",
      placeholder: "Manufacturing Process",
      defaultValue: "",
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
      name: "reqArranPower",
      label: "Requirement and arrangement of Power",
      placeholder: "Requirement and arrangement of Power",
      defaultValue: "",
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
      name: "reqArranWater",
      label: "Requirement and arrangement of Water",
      placeholder: "Requirement and arrangement of Water",
      defaultValue: "",
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
      name: "reqArranEmployee",
      label: "Requirement and arrangement of Employees",
      placeholder: "Requirement and arrangement of Employees",
      defaultValue: "",
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
      name: "brifTechPerson",
      label: "Brief about Technical Person / Plant manager",
      placeholder: "Brief about Technical Person / Plant manager",
      defaultValue: "",
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
      name: "unitMatrix",
      label: "Unit Matrix",
      placeholder: "Unit Matrix",
      defaultValue: "",
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
      name: "projectTurnover",
      label: "Projected Turnover & Profit",
      placeholder: "Projected Turnover & Profit",
      defaultValue: "",
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
      name: "projectParticularDetails",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "select",
          },
          name: "particularType",
          label: "Project Particular Details Type",
          defaultValue: "01",
          //@ts-ignore
          options: "projectParticularType",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            //@ts-ignore
            componentType: "textField",
          },
          name: "particularOfCostOfProject",
          label: "Particulars",
          placeholder: "Particulars",
          defaultValue: "",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["particularType"],
          shouldExclude: "shouldExcludeProjectDetailsTypeCostOfProject",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currencyWithoutWords",
          },
          name: "amountOfCostOfProject",
          label: "Total Amount (In Lacs)",
          placeholder: "Total Amount (In Lacs)",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["particularType"],
          shouldExclude: "shouldExcludeProjectDetailsTypeCostOfProject",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currencyWithoutWords",
          },
          name: "incurredAmountOfCostOfProject",
          label: "Amount Incurred(In Lacs)",
          placeholder: "Amount Incurred(In Lacs)",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["particularType"],
          shouldExclude: "shouldExcludeProjectDetailsTypeCostOfProject",
        },

        {
          render: {
            //@ts-ignore
            componentType: "textField",
          },
          name: "particularOfMeansOfFinance",
          label: "Particulars",
          placeholder: "Particulars",
          defaultValue: "",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["particularType"],
          shouldExclude: "shouldExcludeProjectDetailsTypeMeansOFFinance",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currencyWithoutWords",
          },
          name: "amountOfMeansOfFinance",
          label: "Total Amount (In Lacs)",
          placeholder: "Total Amount (In Lacs)",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["particularType"],
          shouldExclude: "shouldExcludeProjectDetailsTypeMeansOFFinance",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currencyWithoutWords",
          },
          name: "incurredAmountOfMeansOfFinance",
          label: "Amount Incurred(In Lacs)",
          placeholder: "Amount Incurred(In Lacs)",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["particularType"],
          shouldExclude: "shouldExcludeProjectDetailsTypeMeansOFFinance",
        },
      ],
    },
  ],
};
