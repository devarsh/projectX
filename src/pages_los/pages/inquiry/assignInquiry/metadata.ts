import { MetaDataType } from "components/dyanmicForm/types";
export const inquiryAssignMetadata: MetaDataType = {
  form: {
    name: "inquiryAssignForm",
    label: "Assignment",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
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
        componentType: "arrayField",
      },
      name: "usersAssignDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Inquiry Assignment",
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
          name: "teamRole",
          label: "Team Role",
          //@ts-ignore
          options: "getRoleListForInquiryAssign",
          required: true,
          validate: "getValidateValue",
          defaultValue: "00",
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
          name: "teamUser",
          label: "Team User ID",
          dependentFields: ["teamRole"],
          //@ts-ignore
          options: "getTeamRoleListForInquiryAssign",
          required: true,
          defaultValue: "00",
          validate: "getValidateValue",
          disableCaching: true,
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
