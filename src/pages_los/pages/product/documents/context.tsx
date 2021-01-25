import { createContext } from "react";

export const DocumentContext = createContext<{
  viewName: "folders" | "filesView" | "upload";
  docID: any;
  groupID: any;
  path: string[];
  setUploadPath: any;
  setViewPath: any;
  setFoldersPath: any;
} | null>(null);
