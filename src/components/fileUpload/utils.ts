import fileTypeDetect, { FileTypeResult } from "file-type/browser";
import { FileObjectType } from "./type";

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

export function computeFileFingerprint(file) {
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

export const detectMimeType = async (
  fileBlob
): Promise<FileTypeResult | undefined> => {
  const mime = await fileTypeDetect.fromBlob(fileBlob);
  return mime;
};

export const isMimeTypeValid = (ext, whiteListExtension: string[] | string) =>
  whiteListExtension === "all" ||
  (Array.isArray(whiteListExtension) && whiteListExtension.indexOf(ext) > -1);

export const isDuplicate = (file: FileObjectType, fileIDs: string[]) => {
  return Array.isArray(fileIDs) && fileIDs.indexOf(file.id) > -1;
};

export function downloadFile(fileObj: File, fileName?: string) {
  const url = typeof fileObj === "object" && URL.createObjectURL(fileObj);

  const a = document.createElement("a");
  a.href = String(url);

  a.download =
    fileName ?? fileObj.name ?? `download-${new Date().getUTCMilliseconds()}`;
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(String(url));
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.target = "_blank";
  a.addEventListener("click", clickHandler, false);
  a.click();
}
