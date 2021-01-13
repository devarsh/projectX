import { useCallback, useState, FC } from "react";
import { FileListing } from "./fileListing";
import { UploadTarget } from "./uploadTarget";
import { FileListType, FileUploadControlType, TargetBoxType } from "./type";
import { isMimeTypeValid, fingerprint, removeDuplicateFiles } from "./utils";
import Alert, { AlertProps } from "@material-ui/lab/Alert";

export const FileUploadControl: FC<FileUploadControlType> = ({
  allowedExtensions = ["jpg", "png"],
  maxAllowedSize = 1024 * 1024 * 3,
  maxAllowedFiles = 10,
}) => {
  const [droppedFiles, setDroppedFiles] = useState<FileListType[]>([]);
  const [userMessage, setUserMessage] = useState<{
    severity: AlertProps["severity"];
    message: string;
  } | null>(null);
  const transformAndSetDroppedFiles = (files: File[]) => {
    let result = files.map((one) => isMimeTypeValid(one, allowedExtensions));
    Promise.all(result).then((data) => {
      let filteredFiles = data.map((one) => {
        if (one.rejected === false) {
          if (one.filePointer.size > maxAllowedSize) {
            one.rejected = true;
            one.rejectReason = "file size excedded max allowed limit";
          }
        }
        return { ...one, fingerprint: fingerprint(one.filePointer) };
      });
      setDroppedFiles((oldFiles) => {
        let finalFiles = removeDuplicateFiles([...oldFiles, ...filteredFiles]);
        if (finalFiles.length > maxAllowedFiles) {
          setUserMessage({
            severity: "error",
            message: `Only Maximum upto ${maxAllowedFiles} files you can upload`,
          });
          return oldFiles;
        } else {
          setUserMessage(null);
          return finalFiles;
        }
      });
    });
  };

  const handleFileDrop = useCallback<TargetBoxType["onDrop"]>(
    (item, monitor) => {
      console.log(monitor);
      if (monitor) {
        let files;
        if (Array.isArray(monitor)) {
          files = monitor;
        } else {
          files = monitor.getItem().files as File[];
        }
        transformAndSetDroppedFiles(files);
      }
    },
    []
  );
  const handleDeleteFile = useCallback(
    (fingerprint: number) => {
      setDroppedFiles((oldFiles) => {
        const removeItemIndex = oldFiles.findIndex(
          (val) => val.fingerprint === fingerprint
        );
        if (removeItemIndex > -1) {
          const prev = oldFiles.slice(0, removeItemIndex);
          const next = oldFiles.slice(removeItemIndex + 1);
          return [...prev, ...next];
        }
        return oldFiles;
      });
      setUserMessage(null);
    },
    [setDroppedFiles]
  );
  return (
    <>
      <UploadTarget onDrop={handleFileDrop} disabled={false} />
      {userMessage !== null ? (
        <Alert
          severity={userMessage?.severity ?? undefined}
          onClose={() => setUserMessage(null)}
        >
          {userMessage?.message}
        </Alert>
      ) : null}
      <FileListing
        files={droppedFiles}
        dense={true}
        handleDeleteFile={handleDeleteFile}
      />
    </>
  );
};
