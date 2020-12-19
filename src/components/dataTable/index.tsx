import { FC, useEffect, useState } from "react";
import { GridMetaDataType, GridTransformedMetaDataType } from "./types";
import {
  attachComponentsToMetaData,
  attachFilterComponentToMetaData,
  attachAlignmentProps,
  extractHiddenColumns,
  sortColumnsBySequence,
} from "./utils";
import { APISDK } from "registry/fns/sdk";
import { GirdController } from "./gridController";

export const ParentGridWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const gridCode = "trn/001";
  useEffect(() => {
    APISDK.fetchGridMetaData(gridCode)
      .then((result) => {
        if (result.status === "success") {
          let finalData = transformMetaData(result.data);
          setData(finalData);
          setError(false);
          setLoading(false);
        } else {
          setData(result.data);
          setError(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setData(err);
      });
  }, []);
  return loading ? (
    <span>{"loading..."}</span>
  ) : error ? (
    <span>{"error loading grid"}</span>
  ) : (
    <GirdController
      metaData={data as GridTransformedMetaDataType}
      girdCode={gridCode}
    />
  );
};

const transformMetaData = (
  metaData: GridMetaDataType
): GridTransformedMetaDataType => {
  let columns = metaData.columns as any;

  //make sure extract functions are called before attach and lastly sort
  const hiddenColumns = extractHiddenColumns(columns);
  columns = attachComponentsToMetaData(columns);
  columns = attachFilterComponentToMetaData(columns);
  columns = attachAlignmentProps(columns);
  columns = sortColumnsBySequence(columns);

  return {
    columns: columns,
    gridConfig: metaData.gridConfig,
    hiddenColumns: hiddenColumns,
  };
};
