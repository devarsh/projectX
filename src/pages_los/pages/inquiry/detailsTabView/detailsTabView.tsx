import { FC, useEffect, useContext, Suspense } from "react";
import { ClearCacheContext, queryClient } from "cache";

import { CRUD } from "./crud";

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  isDataChangedRef: any;
  isReadOnly?: boolean;
}> = ({ refID, moduleType, isDataChangedRef, isReadOnly = false }) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <Suspense fallback={"loading..."}>
      <CRUD
        moduleType={moduleType}
        productType="main"
        refID={refID}
        dataAlwaysExists={true}
        isDataChangedRef={isDataChangedRef}
        readOnly={isReadOnly}
      />
    </Suspense>
  );
};
