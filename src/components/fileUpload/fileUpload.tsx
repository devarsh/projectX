import { useState, useCallback, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Grid from "components/dataTableStatic";
import metaData from "./metaData";
import failedFilesMetaData from "./failedFilesMetaData";
import { UploadTarget } from "./uploadTarget";
import {
  computeSize,
  computeFileFingerprint,
  detectMimeType,
  isMimeTypeValid,
  isDuplicate,
} from "./utils";
import { FileObjectType } from "./type";
import { DialogActions, DialogContent } from "@material-ui/core";

const transformFileObject = async (
  file: File,
  otherFieldsTemplate: any
): Promise<FileObjectType> => {
  const mimeType = await detectMimeType(file);
  return {
    ...otherFieldsTemplate,
    id: computeFileFingerprint(file),
    blob: file,
    name: file.name.split(".").slice(0, -1).join("."),
    sizeStr: computeSize(file.size),
    size: file.size,
    mimeType: file.type,
    _mimeType: mimeType?.mime ?? "NOT_FOUND",
    ext: mimeType?.ext ?? "NOT_FOUND",
    fileExt: file.name.split(".").pop(),
  };
};

export const FileUploadControl = () => {
  const [files, setFiles] = useState<FileObjectType[]>([]);
  const [failedFiles, setFailedFailes] = useState<FileObjectType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const allowedExtensions = ["jpg", "png", "pdf"];
  const maxAllowedSize = 1024 * 1024 * 3;
  const validateFilesAndAddToList = useCallback(
    async (newFiles: File[], existingFiles: FileObjectType[] | undefined) => {
      let failedFiles: any = [];
      let result = newFiles.map((one) => transformFileObject(one, {}));
      let filesObj = await Promise.all(result);
      let existingFileIds: string[] = [];
      if (Array.isArray(existingFiles)) {
        existingFileIds = existingFiles.map((one) => one.id);
      }
      let filteredNewFilesObj = filesObj.filter((one) => {
        if (one.size > maxAllowedSize) {
          failedFiles.push({
            ...one,
            failedReason: "File Size exceed maximum size",
          });
          return false;
        }
        if (!isMimeTypeValid(one.ext, allowedExtensions)) {
          failedFiles.push({
            ...one,
            failedReason: "File type is not allowed",
          });
          return false;
        }
        if (isDuplicate(one, existingFileIds)) {
          failedFiles.push({
            ...one,
            failedReason: "File already added for uploaing",
          });
          return false;
        }
        return true;
      });
      setFiles((old) => [...old, ...filteredNewFilesObj]);
      if (failedFiles.length > 0) {
        setFailedFailes(failedFiles);
        setOpenDialog(true);
      }
    },
    [setFiles, setFailedFailes, setOpenDialog]
  );

  return (
    <Fragment>
      <Card>
        <CardHeader
          title="File Upload"
          action={
            <CardActions>
              <div style={{ flexGrow: 2 }} />
              <Button disabled={loading} size="small" color="primary">
                Upload
              </Button>
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                size="small"
                color="primary"
              >
                Clear All
              </Button>
            </CardActions>
          }
        />
        <CardContent>
          <DndProvider backend={HTML5Backend}>
            <UploadTarget
              existingFiles={files}
              onDrop={validateFilesAndAddToList}
              disabled={loading}
            />
          </DndProvider>
          <Collapse in={files.length > 0}>
            <Grid finalMetaData={metaData} data={files} setData={setFiles} />
          </Collapse>
        </CardContent>
      </Card>
      <Dialog open={openDialog} maxWidth="md">
        <DialogTitle>Failed To Upload Following Files</DialogTitle>
        <DialogContent>
          <Grid
            finalMetaData={failedFilesMetaData}
            data={failedFiles}
            setData={(any) => null}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setFailedFailes([]);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
