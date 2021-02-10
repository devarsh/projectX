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
        componentType: "textField",
      },
      name: "projectLocation",
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
      },
      name: "areaOfTheProjetLand",
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
      },
      name: "dateOfCommencement",
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
      },
      name: "projectCurrentStage",
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
      },
      name: "moratorium",
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
      },
      name: "installmentOrBalloonig",
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
      },
      name: "machineriesLift",
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
      },
      name: "manufacturedProducts",
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
      },
      name: "powerRequirementOrArrangement",
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
      },
      name: "waterRequirementOrArrangement",
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
      },
      name: "employeeRequirementOrArrangements",
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
      },
      name: "aboutTechnicalPersonOrPlantManager",
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
      },
      name: "projectedTurnoverAndProfit",
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
      },
      name: "projectDetails",
      label: "Project Particular Details",
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
          name: "projectParticularDetailsType",
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
          name: "Particulars",
          label: "Particulars",
          placeholder: "Particulars",
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
            componentType: "currency",
          },
          name: "totalAmount",
          label: "Total Amount (In Lacs)",
          placeholder: "Total Amount (In Lacs)",
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
          name: "amountIncurred",
          label: "Amount Incurred(In Lacs)",
          placeholder: "Amount Incurred(In Lacs)",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },
  ],
};
