import { FC, useMemo, useCallback, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  attachCellComponentsToMetaData,
  attachAlignmentProps,
  sortColumnsBySequence,
  extractHiddenColumns,
} from "components/dataTable/utils";
import { GridMetaDataType } from "./types";
import { DefaultHeaderColumnRenderer } from "./components";
import { DataGrid } from "./grid";

export const GridWrapper: FC<{
  finalMetaData: GridMetaDataType;
  data: any;
}> = ({ finalMetaData, data }) => {
  const metaDataRef = useRef<any>(null);
  if (metaDataRef.current === null) {
    metaDataRef.current = transformMetaData({
      metaData: finalMetaData,
    });
  }
  let metaData = metaDataRef.current;
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
      />
    </DndProvider>
  );
};

const transformMetaData = ({ metaData: freshMetaData }): GridMetaDataType => {
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as GridMetaDataType;
  let columns = metaData.columns as any;
  const hiddenColumns = extractHiddenColumns(columns);
  //make sure extract functions are called before attach and lastly sort
  columns = attachCellComponentsToMetaData(columns);
  columns = attachAlignmentProps(columns);
  columns = sortColumnsBySequence(columns);

  return {
    hiddenColumns: hiddenColumns,
    columns: columns,
    gridConfig: metaData.gridConfig,
  };
};
