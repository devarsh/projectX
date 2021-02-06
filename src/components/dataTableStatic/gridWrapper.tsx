import { FC, useMemo, useCallback, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  attachAlignmentProps,
  sortColumnsBySequence,
  extractHiddenColumns,
  SplitActions,
} from "components/dataTable/utils";
import { attachCellComponentsToMetaData } from "./utils/attachCellComponentsToMetaData";
import { GridMetaDataType, GridWrapperPropTypes } from "./types";
import { DefaultHeaderColumnRenderer } from "./components";
import { DataGrid } from "./grid";

export const GridWrapper: FC<GridWrapperPropTypes> = ({
  finalMetaData,
  data,
  setData,
  actions,
  setAction,
}) => {
  const metaDataRef = useRef<any>(null);
  console.log(finalMetaData);
  if (metaDataRef.current === null) {
    metaDataRef.current = transformMetaData({
      metaData: finalMetaData,
      actions,
      setAction,
    });
  }
  let metaData = metaDataRef.current;
  console.log(metaData);
  /* eslint-disable react-hooks/exhaustive-deps */
  const columns = useMemo(() => metaData.columns, []);
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      maxWidth: 200,
      minWidth: 50,
      Header: DefaultHeaderColumnRenderer,
      ...metaData?.gridConfig?.defaultColumnConfig,
    }),
    [metaData?.gridConfig?.defaultColumnConfig]
  );
  const getRowId = useCallback(
    (row) => row[metaData?.gridConfig?.rowIdColumn],
    [metaData?.gridConfig?.rowIdColumn]
  );

  const updateGridData = (rowIndex, columnID, value, touched, error) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnID]: value,
            _touched: {
              ...old?.[rowIndex]?.["_touched"],
              [columnID]: touched,
            },
            _error: {
              ...old?.[rowIndex]?.["_error"],
              [columnID]: error,
            },
          };
        }
        return row;
      })
    );
  };
  const deleteGridRow = (rowIndex) => {
    setData((old) =>
      old.map((row, index) => {
        if (index !== rowIndex) {
          return row;
        }
      })
    );
  };
  // const validateAllData = () => {
  //   setData((old) =>
  //     old.map((row, index) => {
  //       return {
  //         ...row,
  //         _validate: true,
  //       };
  //     })
  //   );
  // };

  return (
    <DndProvider backend={HTML5Backend}>
      <DataGrid
        label={metaData.gridConfig?.gridLabel ?? "NO_NAME"}
        dense={true}
        getRowId={getRowId}
        columns={columns}
        defaultColumn={defaultColumn}
        data={data}
        allowColumnReordering={metaData.gridConfig?.allowColumnReordering}
        defaultHiddenColumns={metaData.hiddenColumns}
        multipleActions={metaData?.multipleActions}
        singleActions={metaData?.singleActions}
        doubleClickAction={metaData?.doubleClickAction}
        alwaysAvailableAction={metaData?.alwaysAvailableAction}
        setGridAction={metaData?.setAction}
        updateGridData={updateGridData}
        deleteGridRow={deleteGridRow}
      />
    </DndProvider>
  );
};

const transformMetaData = ({
  metaData: freshMetaData,
  actions,
  setAction,
}): GridMetaDataType => {
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as GridMetaDataType;
  let columns = metaData.columns as any;
  const hiddenColumns = extractHiddenColumns(columns);
  //make sure extract functions are called before attach and lastly sort
  columns = attachCellComponentsToMetaData(columns);
  columns = attachAlignmentProps(columns);
  columns = sortColumnsBySequence(columns);
  const splittedActions = SplitActions(actions ?? null);
  return {
    hiddenColumns: hiddenColumns,
    columns: columns,
    gridConfig: metaData.gridConfig,
    setAction: setAction,
    ...splittedActions,
  };
};
