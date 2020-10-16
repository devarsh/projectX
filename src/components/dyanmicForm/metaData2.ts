import { MetaDataType } from "./types";

// const metaData: MetaDataType = {
//   form: {
//     name: "dynamic",
//     label: "Dynamic Form",
//     resetFieldOnUmnount: false,
//     validationRun: "onBlur",
//     render: {
//       ordering: "sequence",
//       renderType: "stepper",
//       gridConfig: {
//         item: {
//           xs: 12,
//           sm: 3,
//           md: 3,
//         },
//         container: {
//           direction: "row",
//           spacing: 2,
//         },
//       },
//     },
//     componentProps: {
//       textField: {
//         fullWidth: true,
//         variant: "outlined",
//       },
//       select: {
//         variant: "outlined",
//         autoWidth: true,
//       },
//       datePicker: {
//         inputVariant: "outlined",
//         fullWidth: true,
//       },
//     },
//   },
//   fields: [
//     {
//       render: {
//         group: "Personal Details",
//         componentType: "select",
//         sequence: 0,
//       },
//       name: "salutation",
//       label: "Salutation",
//       required: true,
//       //api call for salutation retrieve
//       options: [
//         { value: 1, label: "Mr" },
//         { value: 2, label: "Mrs" },
//         { value: 3, label: "Miss" },
//       ],
//     },
//     {
//       render: {
//         group: "Personal Details",
//         componentType: "textField",
//         sequence: 1,
//       },
//       name: "firstName",
//       label: "First Name[As Per PAN Card]",
//       required: true,
//       type: "text",
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["First Name is required"] }],
//       },
//     },
//     {
//       render: {
//         group: "Personal Details",
//         componentType: "textField",
//         sequence: 2,
//       },
//       name: "middleName",
//       label: "Middle Name",
//       type: "text",
//     },
//     {
//       render: {
//         group: "Personal Details",
//         componentType: "textField",
//         sequence: 3,
//       },
//       name: "lastName",
//       label: "Last Name",
//       required: true,
//       type: "text",
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["Last Name is required"] }],
//       },
//     },
//     {
//       render: {
//         group: "Personal Details",
//         componentType: "select",
//         sequence: 4,
//       },
//       name: "gender",
//       label: "Gender",
//       required: true,
//       dependentFields: ["salutation"],
//       options: [
//         { value: 1, label: "Male" },
//         { value: 2, label: "Female" },
//       ],
//       //TODO:
//       //   options: (dependentValues,setValue,multiple) => {
//       //       if
//       //   }
//     },
//     //API call for gender
//     //if salutation Mr. than gender Male auto select
//     //if salutation Mrs. Ms. than gender Female auto select
//     {
//       render: {
//         group: "Personal Details",
//         componentType: "datePicker",
//         sequence: 5,
//       },
//       name: "dob",
//       label: "Date of Birth",
//       required: true,
//       placeholder: "dd/mm/yyyy",
//       format: "dd/MM/yyyy",
//     },
//     {
//       render: {
//         group: "Personal Details",
//         componentType: "textField",
//         sequence: 6,
//       },
//       name: "loanamt",
//       label: "Your Desired Loan Amount",
//       type: "number",
//       required: true,
//       enableNumWords: true,
//       schemaValidation: {
//         type: "number",
//         rules: [
//           {
//             name: "required",
//             params: ["Your Desired Loan Amount is required"],
//           },
//           {
//             name: "min",
//             params: [1, "Amount should always be greatern than zero"],
//           },
//         ],
//       },
//     },
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "textField",
//         sequence: 1,
//       },
//       name: "mobNo",
//       label: "Mobile Number",
//       required: true,
//       type: "text",
//       defaultValue: "",
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["Mobile Number is required"] }],
//       },
//     },
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "textField",
//         sequence: 2,
//       },
//       name: "email",
//       label: "Email",
//       required: true,
//       type: "text",
//       defaultValue: "",
//       schemaValidation: {
//         type: "string",
//         rules: [
//           { name: "required", params: ["Email is required"] },
//           { name: "email", params: ["It should be a valid email"] },
//         ],
//       },
//     },
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "select",
//         sequence: 3,
//       },
//       name: "employed",
//       label: "How Are You Currently Employed",
//       required: true,
//       //todo make it api
//       options: [
//         { value: "1", label: "Salaried" },
//         { value: "2", label: "Self Employed" },
//         { value: "3", label: "Business" },
//       ],
//     },
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "textField",
//         sequence: 4,
//       },
//       name: "pincode",
//       label: "Residence Pincode",
//       required: true,
//       type: "text",
//       schemaValidation: {
//         type: "string",
//         rules: [
//           { name: "required", params: ["Residence Pincode is required"] },
//         ],
//       },
//     },
//     // {
//     //   render: {
//     //     group: "Contact Details",
//     //     componentType: "select",
//     //     sequence: 5,
//     //   },
//     //   name: "location",
//     //   label: "Location",
//     //   required: true,
//     // },
//     //auto data using Pincode
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "textField",
//         sequence: 6,
//       },
//       name: "city",
//       label: "City",
//       required: true,
//       type: "text",
//       defaultValue: "",
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["City is required"] }],
//       },
//       dependentFields: ["pincode"],
//     },
//     //auto data using Pincode
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "textField",
//         sequence: 7,
//       },
//       name: "state",
//       label: "State",
//       required: true,
//       type: "text",
//       defaultValue: "",
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["State is required"] }],
//       },
//       dependentFields: ["pincode"],
//     },
//     //auto data using Pincode
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "textField",
//         sequence: 8,
//       },
//       name: "district",
//       label: "District",
//       required: true,
//       type: "text",
//       defaultValue: "",
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["State is required"] }],
//       },
//       dependentFields: ["pincode"],
//     },
//     //auto data using Pincode
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "textField",
//         sequence: 9,
//       },
//       name: "country",
//       label: "Country",
//       required: true,
//       type: "text",
//       defaultValue: "",
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["Country is required"] }],
//       },
//       dependentFields: ["pincode"],
//     },
//     //auto data using Pincode
//     {
//       render: {
//         group: "Contact Details",
//         componentType: "checkbox",
//         sequence: 10,
//       },
//       name: "agreed",
//       label:
//         "I have read and agreed to the Terms of Use and hereby appoint Ratnaafin as my authorised representative to receive my credit information from Cibil/ EquIfax/ Experian/ Highmark (bureau).",
//       required: true,
//       type: "text",
//       defaultValue: "N",
//     },
//   ],
// };

// export default metaData;
