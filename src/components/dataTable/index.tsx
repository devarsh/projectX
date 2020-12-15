import { FC, useEffect, useState } from "react";
import { GridMetaDataType } from "./types";
import {
  attachComponentsToMetaData,
  attachFilterComponentToMetaData,
  attachAlignmentProps,
  extractHiddenColumns,
  sortColumnsBySequence,
} from "./utils";
import { APISDK } from "registry/fns/sdk";

export const GridWrapper: FC<{ metaData: GridMetaDataType }> = ({
  metaData,
}) => {
  let transformedMetaData: any = metaData.columns;
  transformedMetaData = attachComponentsToMetaData(transformedMetaData);
  transformedMetaData = attachFilterComponentToMetaData(transformedMetaData);
  transformedMetaData = attachAlignmentProps(transformedMetaData);
  transformedMetaData = sortColumnsBySequence(transformedMetaData);
  const hiddenColumns = extractHiddenColumns(transformedMetaData);

  return null;
};

export const ParentGridWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const runEffect = async () => {
      setLoading(true);
      let result = await APISDK.fetchGridMetaData("trn/001");
      if (result.status === "success") {
        console.log(result.data);
      } else {
        console.log(result.data);
      }
    };
    runEffect();
  }, []);
  return null;
};
