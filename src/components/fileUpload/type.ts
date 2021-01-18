import { DropTargetMonitor } from "react-dnd";

export interface FileListType {
  file: File | string;
  name: string;
  size: string | number;
  mimeType: string;
  fingerprint?: string | number;
  ext?: string;
  rejected?: boolean;
  rejectReason?: string;
}

export interface TargetBoxType {
  onDrop: (props: TargetBoxType, monitor: File[]) => void;
  disabled?: boolean;
}

export interface FileUploadControlType {
  allowedExtensions?: string[] | string;
  maxAllowedSize?: number;
  maxAllowedFiles?: number;
  docType: string;
  docLabel: string;
  docDescription?: string;
}

export interface FileListingControlType {
  files: FileListType[];
  handleDeleteFile: any;
  dense: boolean;
  disabled?: boolean;
  disableDelete?: boolean;
  disablePreview?: boolean;
}

export interface FileListItemType {
  fileObj: FileListType;
  disabled: boolean | undefined;
  dense: boolean | undefined;
  handleDeleteFile: any;
  setCurrentView: any;
  disableDelete: boolean;
}
