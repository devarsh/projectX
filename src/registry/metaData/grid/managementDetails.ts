import { GridMetaDataType } from "components/dataTableStatic";

export const ManagementDetailsGridMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "Lead ID",
      componentType: "default",
      accessor: "leadID",
      sequence: 0,
      alignment: "left",
      isVisible: false,
    },
    {
      columnName: "Serial No",
      componentType: "default",
      accessor: "serialNo",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Salutation",
      componentType: "default",
      accessor: "salutation",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "First Name",
      componentType: "default",
      accessor: "firstName",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Last Name",
      componentType: "default",
      accessor: "lastName",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Gender",
      componentType: "default",
      accessor: "gender",
      sequence: 5,
      alignment: "left",
    },
    {
      columnName: "Mobile No",
      componentType: "default",
      accessor: "mobileNo",
      sequence: 6,
      alignment: "left",
    },
    {
      columnName: "Email ID",
      componentType: "default",
      accessor: "emailID",
      sequence: 7,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Management Details",
    rowIdColumn: "serialNo",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: false,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};
