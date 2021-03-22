import { ClearCacheProvider } from "cache";
import { RoleManagement } from "./roleAssignment";

export const UserManagement = () => (
  <ClearCacheProvider>
    <RoleManagement />
  </ClearCacheProvider>
);
