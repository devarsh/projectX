import { MetaDataType } from "components/dyanmicForm/types";
import {
  getProductSubCategory,
  showSubProductTypeField,
  showSMEProductTypeField,
} from "../fns";

export const moveToInquiryMetaData: MetaDataType = {
  form: {
    name: "moveToInquiry",
    label: "Move To Inquiry",
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
        componentType: "typography",
      },
      name: "productDetails",
      label: "Product Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "categoryID",
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
      name: "productID",
      label: "Sub Category",
      defaultValue: "00",
      dependentFields: ["categoryID"],
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
      dependentFields: ["productID"],
      //@ts-ignore
      options: "getProductTypeForMoveToInquiry",
      disableCaching: true,
      required: true,
      validate: "getValidateValue",
      shouldExclude: showSMEProductTypeField,
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
        componentType: "spacer",
        group: 0,
      },
      name: "spacer1",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "typography",
      },
      name: "personalDetails",
      label: "Personal Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
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
        //@ts-ignore
        componentType: "dob",
        group: 0,
      },
      name: "dob",
      label: "Date Of Birth",
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      required: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
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
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This Field is required."] }],
      },
    },
    {
      render: {
        componentType: "typography",
      },
      name: "contactDetails",
      label: "Contact Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
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
      name: "email",
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
        componentType: "select",
        group: 1,
      },
      name: "employementStatus",
      label: "How Are You Currently Employed",
      placeholder: "How Are You Currently Employed",
      //@ts-ignore
      options: "getEmployementCodeForMoveToInquiry",
      dependentFields: ["categoryID", "productID"],
      validate: "getValidateValue",
      disableCaching: true,
      required: true,
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
        group: 1,
      },
      name: "address",
      label: "Address",
      placeholder: "Address",
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
    {
      render: {
        componentType: "hidden",
        group: 0,
      },
      name: "status",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
