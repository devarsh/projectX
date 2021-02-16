import { GridMetaDataType } from "components/dataTableStatic";

export const ProjectDetailsGridMetaData: GridMetaDataType = {
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
      columnName: "Land Location",
      componentType: "default",
      accessor: "landLocation",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Land Details",
      componentType: "default",
      accessor: "landDetails",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Land Area ApproxValuation",
      componentType: "default",
      accessor: "landAreaApproxValuation",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Commencement Date",
      componentType: "default",
      accessor: "commencementDate",
      sequence: 5,
      alignment: "left",
    },
    {
      columnName: "Installed Capacity",
      componentType: "default",
      accessor: "installedCapacity",
      sequence: 6,
      alignment: "left",
    },
    {
      columnName: "Product Manufactured",
      componentType: "default",
      accessor: "productManufactured",
      sequence: 7,
      alignment: "left",
    },
    {
      columnName: "Project Turnover",
      componentType: "default",
      accessor: "projectTurnover",
      sequence: 8,
      alignment: "left",
    },
    {
      columnName: "Project Particular Count",
      componentType: "default",
      accessor: "projectParticularCount",
      sequence: 9,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Project Details",
    rowIdColumn: "serialNo",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    disableGroupBy: true,
    allowColumnReordering: false,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};
