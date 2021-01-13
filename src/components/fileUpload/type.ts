import { DropTargetMonitor } from "react-dnd";

export interface FileListType {
  filePointer: File;
  fingerprint: number;
  rejected?: boolean;
  rejectReason?: string;
  ext?: string;
}

export interface TargetBoxType {
  onDrop: (props: TargetBoxType, monitor: DropTargetMonitor | File[]) => void;
  disabled?: boolean;
}

export interface FileUploadControlType {
  allowedExtensions?: string[] | string;
  maxAllowedSize?: number;
  maxAllowedFiles?: number;
}

export interface FileListingControlType {
  files: FileListType[];
  handleDeleteFile: any;
  dense: boolean;
  disabled?: boolean;
}
