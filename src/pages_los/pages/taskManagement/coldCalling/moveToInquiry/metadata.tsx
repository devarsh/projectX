import { MetaDataType } from "components/dyanmicForm/types";
import { getProductSubCategory, showSubProductTypeField } from "../fns";

export const moveToInquiryMetaData: MetaDataType = {
  form: {
    name: "moveToInquiry",
    label: "Move To Inquiry",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: { "0": "Personal Details", "1": "Address Details" },
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
      name: "productCategory",
      label: "Product Category",
      defaultValue: "00",
      //@ts-ignore
      options: "getMainProductList",
      validate: "getValidateValue",
      required: true,
      disableCaching: true,
      GridProps: {
        xs: 3,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "subCategory",
      label: "Sub Category",
      defaultValue: "00",
      dependentFields: ["productCategory"],
      //@ts-ignore
      options: getProductSubCategory,
      disableCaching: true,
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 3,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "productType",
      label: "Product Type",
      defaultValue: "00",
      dependentFields: ["subCategory"],
      //@ts-ignore
      options: "getProductTypeForMoveToInquiry",
      disableCaching: true,
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 3,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "subProductType",
      label: "Sub Product Type",
      defaultValue: "00",
      dependentFields: ["productType"],
      //@ts-ignore
      options: "getCRMSubProductType",
      disableCaching: true,
      required: true,
      validate: "getValidateValue",
      shouldExclude: showSubProductTypeField,
      GridProps: {
        xs: 3,
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
      defaultValue: "00",
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
      isReadOnly: true,
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
        componentType: "currency",
        group: 0,
      },
      name: "loanAmount",
      label: "Desired Loan Amount",
      placeholder: "Desired Loan Amount",
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
        group: 1,
      },
      name: "mobileNo",
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
        group: 1,
      },
      name: "emailID",
      type: "email",
      label: "Email",
      placeholder: "Email",
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
        group: 1,
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
        group: 1,
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
        group: 1,
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
        group: 1,
      },
      name: "location",
      label: "Location",
      placeholder: "Location",
      dependentFields: ["pincode"],
      required: true,
      //@ts-ignore
      options: "getPincode",
      defaultValue: "0",
      //@ts-ignore
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
        group: 1,
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
        group: 1,
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
        group: 1,
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
        group: 1,
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
    // {
    //   render: {
    //     componentType: "textField",
    //   },
    //   name: "remarks",
    //   label: "Remarks",
    //   required: true,
    //   GridProps: {
    //     xs: 6,
    //     md: 6,
    //     sm: 6,
    //   },
    //   schemaValidation: {
    //     type: "string",
    //     rules: [{ name: "required", params: ["This is a required field"] }],
    //   },
    // },
  ],
};
