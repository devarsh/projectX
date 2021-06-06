export const assignedMetaData = {
  gridConfig: {
    dense: false,
    pageSize: [20, 30, 50],
    defaultPageSize: "20",
    gridLabel: "Assigned Task",
    rowIdColumn: "refID",
    allowColumnReordering: true,
    allowColumnHiding: true,
    allowKeyboardNavigation: true,
    allowGlobalFilter: true,
  },
  columns: [
    {
      accessor: "subject",
      columnName: "Task",
      sequence: 1,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "type",
      columnName: "Type of Task",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "othersType",
      columnName: "Other Type of Project",
      sequence: 3,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "status",
      columnName: "Task Status",
      sequence: 4,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "dueDate",
      columnName: "Task Due Date",
      sequence: 5,
      alignment: "left",
      componentType: "date",
      format: "dd/MM/yyyy",
    },
    {
      accessor: "completionDate",
      columnName: "Task Completion Date",
      sequence: 6,
      alignment: "left",
      componentType: "date",
      format: "dd/MM/yyyy",
    },
    {
      accessor: "description",
      columnName: "Task Description",
      sequence: 7,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "worker",
      columnName: "Task Assign To",
      sequence: 8,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "enteredDate",
      columnName: "Task Entered Date",
      sequence: 9,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "modifiedBy",
      columnName: "Modified By",
      sequence: 10,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "modifiedDate",
      columnName: "Modified Date",
      sequence: 11,
      alignment: "left",
      componentType: "date",
      format: "dd/MM/yyyy",
    },
    {
      accessor: "taskSource",
      columnName: "Source",
      sequence: 12,
      alignment: "right",
      componentType: "default",
    },
  ],
};
