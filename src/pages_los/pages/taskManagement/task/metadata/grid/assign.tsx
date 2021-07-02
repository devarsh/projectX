export const assignMetaData = {
  gridConfig: {
    dense: false,
    pageSize: [20, 30, 50],
    defaultPageSize: "20",
    gridLabel: "My Task",
    rowIdColumn: "tran_cd",
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
      filterComponentType: "gridSearch",
      disableSortBy: false,
      isVisible: true,
    },
    {
      accessor: "task_type",
      columnName: "Type of Task",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "others_type",
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
      accessor: "due_date",
      columnName: "Task Due Date",
      sequence: 5,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "completion_date",
      columnName: "Task Completion Date",
      sequence: 6,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "dateDiffer",
      columnName: "Remaining Time",
      sequence: 8,
      alignment: "left",
      componentType: "dateDiffere",
      dependencies: {
        startDate: "entered_date",
        endDate: "due_date",
        completionDate: "completion_date",
      },
    },
    {
      accessor: "description",
      columnName: "Task Description",
      sequence: 7,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "entered_by",
      columnName: "Task entered By",
      sequence: 8,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "entered_date",
      columnName: "Task Entered Date",
      sequence: 9,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "last_entered_by",
      columnName: "Modified By",
      sequence: 10,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "last_modified_date",
      columnName: "Modified Date",
      sequence: 11,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      accessor: "flag",
      columnName: "Source",
      sequence: 12,
      alignment: "left",
      componentType: "default",
    },
  ],
};
