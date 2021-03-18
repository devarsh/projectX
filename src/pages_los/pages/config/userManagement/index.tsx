import { ClearCacheProvider } from "cache";
import { DetailsTabView } from "./detailsTabView";

export const UserManagement = () => (
  <ClearCacheProvider>
    <DetailsTabView />
  </ClearCacheProvider>
);
