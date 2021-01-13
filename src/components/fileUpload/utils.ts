import fileTypeDetect from "file-type/browser";
import { FileListType } from "./type";

export function hashCode(str) {
  // from https://stackoverflow.com/a/8831937/151666
  var hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export function fingerprint(file) {
  return hashCode(
    [file.name, file.type, file.size, file.lastModified].join("-")
  );
}

export const computeSize = (sizeInBytes) => {
  if (Number.isInteger(Number(sizeInBytes))) {
    let sOutput = `${sizeInBytes} bytes`;
    const aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    for (
      let nMultiple = 0, nApprox = sizeInBytes / 1024;
      nApprox > 1;
      nApprox = nApprox / 1024, nMultiple++
    ) {
      sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
    }
    return sOutput;
  } else {
    return "cannot compute size";
  }
};

export const isMimeTypeValid = async (
  file: File,
  whiteListExtension: string[] | string
) => {
  const result = { rejected: false, rejectReason: "", ext: "" };
  const mime = await fileTypeDetect.fromBlob(file);
  result.ext = mime?.ext ?? "";
  if (mime === undefined) {
    result.rejected = true;
    result.rejectReason = "file type is not allowed";
  } else if (
    whiteListExtension !== "all" &&
    Array.isArray(whiteListExtension) &&
    whiteListExtension.indexOf(mime?.ext) === -1
  ) {
    result.rejected = true;
    result.rejectReason = "file type is not allowed";
  }
  return { ...result, filePointer: file };
};

export const removeDuplicateFiles = (files: FileListType[]) => {
  if (Array.isArray(files) && files.length > 0) {
    const visitedSignature: number[] = [];
    let uniqueFiles = files.reduce<FileListType[]>((accum, current) => {
      if (visitedSignature.indexOf(current.fingerprint) === -1) {
        visitedSignature.push(current.fingerprint);
        accum.push(current);
      }
      return accum;
    }, []);
    return uniqueFiles;
  }
  return [];
};
