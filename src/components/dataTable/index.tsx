import { FC, useEffect, useState } from "react";
import { GridMetaDataType, HeaderFilterType } from "./types";
import {
  attachComponentsToMetaData,
  attachFilterComponentToMetaData,
  attachAlignmentProps,
  extractHiddenColumns,
  sortColumnsBySequence,
  transformHeaderFilters,
} from "./utils";
import { APISDK } from "registry/fns/sdk";
import { GirdController } from "./gridController";

export const ParentGridWrapper = () => {
  const gridCode = "trn/001";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    APISDK.fetchGridMetaData(gridCode)
      .then((result) => {
        if (result.status === "success") {
          let finalData = transformMetaData(result.data, gridCode);
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
    <GirdController
      metaData={metaData as GridMetaDataType}
      girdCode={gridCode}
    />
  );
};

const transformMetaData = (
  metaData: GridMetaDataType,
  gridCode: string
): GridMetaDataType => {
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

  return {
    columns: columns,
    gridConfig: metaData.gridConfig,
    hiddenColumns: hiddenColumns,
    headerFilters: transformedHeaderFilters,
  };
};
