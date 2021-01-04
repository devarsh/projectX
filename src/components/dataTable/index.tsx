import { useEffect, useState } from "react";
import { GridMetaDataType } from "./types";
import {
  attachComponentsToMetaData,
  attachFilterComponentToMetaData,
  attachAlignmentProps,
  extractHiddenColumns,
  sortColumnsBySequence,
  transformHeaderFilters,
  transformHeaderFiltersNew,
} from "./utils";
import { APISDK } from "registry/fns/sdk";
import { GirdController } from "./gridController";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ParentGridWrapper = () => {
  const gridCode = "trn/001";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [metaData, setMetaData] = useState<GridMetaDataType | null>();

  useEffect(() => {
    APISDK.fetchGridMetaData(gridCode)
      .then((result) => {
        if (result.status === "success") {
          let finalData = transformMetaData({
            metaData: result.data,
            gridCode,
          });
          Promise.resolve(finalData.headerFilters).then((filtersResult) => {
            finalData.headerFilters = filtersResult;
            setMetaData(finalData);
            setError(false);
            setLoading(false);
          });
        } else {
          setMetaData(result.data);
          setError(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMetaData(err);
      });
  }, []);

  return loading ? (
    <span>{"loading..."}</span>
  ) : error ? (
    <span>{"error loading grid"}</span>
  ) : (
    <DndProvider backend={HTML5Backend}>
      <GirdController
        metaData={metaData as GridMetaDataType}
        gridCode={gridCode}
      />
    </DndProvider>
  );
};

const transformMetaData = ({
  metaData: freshMetaData,
  gridCode,
}): GridMetaDataType => {
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as GridMetaDataType;

  let columns = metaData.columns as any;
  //make sure extract functions are called before attach and lastly sort
  const hiddenColumns = extractHiddenColumns(columns);
  columns = attachComponentsToMetaData(columns);
  columns = attachFilterComponentToMetaData(columns);
  columns = attachAlignmentProps(columns);
  columns = sortColumnsBySequence(columns);
  const transformedHeaderFilters = transformHeaderFilters(
    gridCode,
    metaData.headerFilters
  );
  if (metaData.headerFilters !== undefined) {
    const filters = transformHeaderFiltersNew(metaData.headerFilters);
  }
  return {
    columns: columns,
    gridConfig: metaData.gridConfig,
    hiddenColumns: hiddenColumns,
    headerFilters: transformedHeaderFilters,
  };
};
