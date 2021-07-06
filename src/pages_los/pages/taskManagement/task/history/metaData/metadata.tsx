import { GridMetaDataType } from "components/dataTableStatic";

export const historyGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Task History",
    rowIdColumn: "serialNo",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    hideHeader: false,
    disableGroupBy: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
  columns: [
    {
      accessor: "serialNo",
      columnName: "SerialNo",
      sequence: 1,
      alignment: "left",
      componentType: "default",
    },

    {
      accessor: "status",
      columnName: "Status",
      sequence: 6,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "description",
      columnName: "Description",
      sequence: 9,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "modifiedBy",
      columnName: "Modified By",
      sequence: 13,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "modifiedDate",
      columnName: "Modified Date",
      sequence: 14,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
  ],
};
