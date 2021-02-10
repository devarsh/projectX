export const abc = "yes";
// import { useCallback, useState, FC } from "react";
// import { UploadTarget } from "./uploadTarget";
// import { FileListType, FileUploadControlType, TargetBoxType } from "./type";
// import { isMimeTypeValid, fingerprint, removeDuplicateFiles } from "./utils";
// import Alert, { AlertProps } from "@material-ui/lab/Alert";
// import Card from "@material-ui/core/Card";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { DndProvider } from "react-dnd";

// export const FileUploadControl: FC<FileUploadControlType> = ({
//   allowedExtensions = ["jpg", "png", "pdf"],
//   maxAllowedSize = 1024 * 1024 * 3,
//   maxAllowedFiles = 10,
//   onSubmitHandler,
// }) => {
//   const [droppedFiles, setDroppedFiles] = useState<FileListType[]>([]);
//   const [userMessage, setUserMessage] = useState<{
//     severity: AlertProps["severity"];
//     message: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(Infinity);

//   const transformAndSetDroppedFiles = useCallback(
//     (files: File[]) => {
//       let result = files.map((one) => isMimeTypeValid(one, allowedExtensions));
//       Promise.all(result).then((data) => {
//         let filteredFiles = data.map((one) => {
//           if (one.rejected === false) {
//             if (one.size > maxAllowedSize) {
//               one.rejected = true;
//               one.rejectReason = "file size excedded max allowed limit";
//             }
//           }
//           return { ...one, fingerprint: fingerprint(one.file) };
//         });
//         setDroppedFiles((oldFiles) => {
//           let finalFiles = removeDuplicateFiles([
//             ...filteredFiles,
//             ...oldFiles,
//           ]);
//           if (finalFiles.length > maxAllowedFiles) {
//             setUserMessage({
//               severity: "error",
//               message: `Only Maximum upto ${maxAllowedFiles} files you can upload`,
//             });
//             return oldFiles;
//           } else {
//             setUserMessage(null);
//             return finalFiles;
//           }
//         });
//       });
//     },
//     [
//       isMimeTypeValid,
//       setUserMessage,
//       removeDuplicateFiles,
//       maxAllowedFiles,
//       maxAllowedSize,
//       allowedExtensions,
//     ]
//   );

//   // const handleFileDrop = useCallback<TargetBoxType["onDrop"]>(
//   //   (item, files) => {
//   //     transformAndSetDroppedFiles(files);
//   //   },
//   //   [transformAndSetDroppedFiles]
//   // );

//   const handleDeleteFile = useCallback(
//     (fingerprint: number) => {
//       setDroppedFiles((oldFiles) => {
//         const removeItemIndex = oldFiles.findIndex(
//           (val) => val.fingerprint === fingerprint
//         );
//         if (removeItemIndex > -1) {
//           const prev = oldFiles.slice(0, removeItemIndex);
//           const next = oldFiles.slice(removeItemIndex + 1);
//           return [...prev, ...next];
//         }
//         return oldFiles;
//       });
//       setUserMessage(null);
//     },
//     [setDroppedFiles]
//   );

//   const handleUpload = () => {
//     if (droppedFiles.length <= 0) {
//       setUserMessage({
//         severity: "info",
//         message: "Please select a file for upload",
//       });
//       return;
//     }
//     const rejectedFiles = droppedFiles.filter((one) => one.rejected === true);
//     if (rejectedFiles.length > 0) {
//       setUserMessage({
//         severity: "warning",
//         message:
//           "Please remove any unsupported files before uploading can start",
//       });
//       return;
//     }
//     setLoading(true);
//     const files = droppedFiles.map((one) => one.file);
//     onSubmitHandler(files, setLoading, setUserMessage, setProgress);
//   };

//   return (
//     <Card>
//       {loading ? (
//         <LinearProgress
//           variant={progress !== Infinity ? "determinate" : "indeterminate"}
//           value={progress !== Infinity ? progress : undefined}
//         />
//       ) : null}
//     </Card>
//   );
// };
