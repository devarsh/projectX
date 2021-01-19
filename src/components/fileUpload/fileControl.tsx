import { useCallback, useState, FC } from "react";
import { FileListing } from "./fileListing";
import { UploadTarget } from "./uploadTarget";
import { FileListType, FileUploadControlType, TargetBoxType } from "./type";
import { isMimeTypeValid, fingerprint, removeDuplicateFiles } from "./utils";
import Alert, { AlertProps } from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import LinearProgress from "@material-ui/core/LinearProgress";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const FileUploadControl: FC<FileUploadControlType> = ({
  allowedExtensions = ["jpg", "png", "pdf"],
  maxAllowedSize = 1024 * 1024 * 3,
  maxAllowedFiles = 10,
  onSubmitHandler,
}) => {
  const [droppedFiles, setDroppedFiles] = useState<FileListType[]>([]);
  const [userMessage, setUserMessage] = useState<{
    severity: AlertProps["severity"];
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(Infinity);

  const transformAndSetDroppedFiles = (files: File[]) => {
    let result = files.map((one) => isMimeTypeValid(one, allowedExtensions));
    Promise.all(result).then((data) => {
      let filteredFiles = data.map((one) => {
        if (one.rejected === false) {
          if (one.size > maxAllowedSize) {
            one.rejected = true;
            one.rejectReason = "file size excedded max allowed limit";
          }
        }
        return { ...one, fingerprint: fingerprint(one.file) };
      });
      setDroppedFiles((oldFiles) => {
        let finalFiles = removeDuplicateFiles([...filteredFiles, ...oldFiles]);
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

  const handleFileDrop = useCallback<TargetBoxType["onDrop"]>((item, files) => {
    transformAndSetDroppedFiles(files);
  }, []);

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

  const handleUpload = () => {
    if (droppedFiles.length <= 0) {
      setUserMessage({
        severity: "info",
        message: "Please select a file for upload",
      });
      return;
    }
    const rejectedFiles = droppedFiles.filter((one) => one.rejected === true);
    if (rejectedFiles.length > 0) {
      setUserMessage({
        severity: "warning",
        message:
          "Please remove any unsupported files before uploading can start",
      });
      return;
    }
    setLoading(true);
    const files = droppedFiles.map((one) => one.file);
    onSubmitHandler(files, setLoading, setUserMessage, setProgress);
  };

  return (
    <Card>
      {loading ? (
        <LinearProgress
          variant={progress !== Infinity ? "determinate" : "indeterminate"}
          value={progress !== Infinity ? progress : undefined}
        />
      ) : null}
      <CardContent>
        <DndProvider backend={HTML5Backend}>
          <UploadTarget onDrop={handleFileDrop} disabled={loading} />
        </DndProvider>
        {userMessage !== null ? (
          <Alert
            severity={userMessage?.severity ?? undefined}
            onClose={() => setUserMessage(null)}
          >
            {userMessage?.message}
          </Alert>
        ) : null}
        <Collapse in={droppedFiles.length > 0}>
          <div style={{ height: "275px", margin: "4px", overflowY: "scroll" }}>
            <FileListing
              files={droppedFiles}
              dense={true}
              handleDeleteFile={handleDeleteFile}
              disabled={loading}
            />
          </div>
        </Collapse>
      </CardContent>
      <CardActions>
        <Typography>Total Files: {droppedFiles.length}</Typography>
        <div style={{ flexGrow: 2 }} />
        <Button
          disabled={loading}
          onClick={() => handleUpload()}
          size="small"
          color="primary"
        >
          Upload
        </Button>
        <Button
          onClick={() => setDroppedFiles([])}
          disabled={loading}
          size="small"
          color="primary"
        >
          Clear All
        </Button>
      </CardActions>
    </Card>
  );
};
