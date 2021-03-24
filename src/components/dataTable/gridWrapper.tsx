import { forwardRef, useCallback } from "react";
import { GridMetaDataType, ActionTypes } from "./types";
import {
  attachCellComponentsToMetaData,
  attachFilterComponentToMetaData,
  attachAlignmentProps,
  extractHiddenColumns,
  sortColumnsBySequence,
  transformHeaderFilters,
  SplitActions,
} from "./utils";
import { GirdController } from "./gridController";
import { GridProvider } from "./context";

interface GridWrapperPropsType {
  gridCode: any;
  getGridData: any;
  getGridColumnFilterData: any;
  metaData: GridMetaDataType;
  actions?: ActionTypes[];
  setAction: any;
}

export const GridWrapper = forwardRef<GridMetaDataType, any>(
  (
    {
      gridCode,
      getGridColumnFilterData,
      getGridData,
      metaData,
      actions,
      setAction,
    },
    ref
  ) => {
    let finalData = transformMetaData({
      metaData,
      actions,
      setAction,
    });

    return (
      <GridProvider
        gridCode={gridCode}
        getGridData={getGridData}
        getGridColumnFilterData={getGridColumnFilterData}
      >
        <GirdController
          //@ts-ignore
          ref={ref}
          metaData={finalData as GridMetaDataType}
        />
      </GridProvider>
    );
  }
);

const transformMetaData = ({
  metaData: freshMetaData,
  actions,
  setAction,
}): GridMetaDataType => {
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as GridMetaDataType;

  let columns = metaData.columns as any;
  //make sure extract functions are called before attach and lastly sort
  const hiddenColumns = extractHiddenColumns(columns);
  columns = attachCellComponentsToMetaData(columns);
  columns = attachFilterComponentToMetaData(columns);
  columns = attachAlignmentProps(columns);
  columns = sortColumnsBySequence(columns);
  let headerFilters = transformHeaderFilters(metaData?.headerFilters);
  const splittedActions = SplitActions(actions ?? null);
  return {
    columns: columns,
    gridConfig: metaData.gridConfig,
    hiddenColumns: hiddenColumns,
    headerFilters: headerFilters,
    setAction: setAction,
    ...splittedActions,
  };
};
