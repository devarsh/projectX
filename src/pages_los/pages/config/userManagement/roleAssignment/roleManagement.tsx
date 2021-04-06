import { useContext, useEffect } from "react";
import { ClearCacheContext } from "cache";
import { CRUDContextProvider } from "pages_los/common";
import { queryClient } from "cache";
import { createRoleAssignmentContext } from "./context";
import { RoleAssignment } from "./roleAssignment";

export const RoleManagement = () => {
  const removeCache = useContext(ClearCacheContext);
  //Remove all the cached queries of all tabs when this component unmounts
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <CRUDContextProvider
      {...createRoleAssignmentContext("users/employee", "role", null)}
    >
      <RoleAssignment />
    </CRUDContextProvider>
  );
};
