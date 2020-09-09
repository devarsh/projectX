import React from "react";
import { FieldArrayProps, TemplateFieldRow, RenderFn } from "./types";

export const useFieldArray = ({
  arrayFieldName,
  template,
}: FieldArrayProps) => {
  if ((template ?? null) === null) {
    throw new Error("Pass a valid template object");
  }
  if ((arrayFieldName ?? "") === "") {
    throw new Error("Pass ArrayField name");
  }

  const [fieldRows, setFieldRows] = React.useState<TemplateFieldRow[]>([]);
  const fieldRowInsertIndex = React.useRef(-1);
  //caching template keys
  let templateFieldNamesRef = React.useRef<string[] | null>(null);
  if (templateFieldNamesRef.current === null) {
    templateFieldNamesRef.current = Object.keys(template);
  }

  //this functions accept index and current fieldRows as arguments to make it independent and to be used
  //where you want to bulk insert without setting setState on every insert - shaving off extra rerenders.
  const _insert = (index: number, rowBuf: TemplateFieldRow[]) => {
    if (!(index >= 0 && index <= rowBuf.length)) {
      return;
    }
    const insertIndex = fieldRowInsertIndex.current++;
    let newRow: TemplateFieldRow = {
      values: {},
      fieldKey: `${arrayFieldName}-${insertIndex}`,
    };
    for (const fieldName of templateFieldNamesRef.current ?? []) {
      const key = `${arrayFieldName}[${insertIndex}].${fieldName}`;
      const name = `${arrayFieldName}[${index}].${fieldName}`;
      newRow.values[fieldName] = { key, name };
    }
    const beginningRows = rowBuf.slice(0, index);
    const endingRows = rowBuf.slice(index);
    let currentIndex = index + 1;
    for (let oneRow of endingRows) {
      for (const fieldName of templateFieldNamesRef.current ?? []) {
        oneRow.values[
          fieldName
        ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
      }
      currentIndex++;
    }
    return [...beginningRows, newRow, ...endingRows];
  };

  const insert = (index: number) => {
    const result = _insert(index, fieldRows);
    if (Array.isArray(result)) {
      setFieldRows(result);
    }
  };

  const push = () => {
    const result = _insert(fieldRows.length, fieldRows);
    if (Array.isArray(result)) {
      setFieldRows(result);
    }
  };
  const unshift = () => {
    const result = _insert(0, fieldRows);
    if (Array.isArray(result)) {
      setFieldRows(result);
    }
  };
  const remove = (index: number) => {
    if (!(index >= 0 && index < fieldRows.length)) {
      return;
    }
    let currentIndex = index;
    const beginningRows = fieldRows.slice(0, currentIndex);
    const endingRows = fieldRows.slice(currentIndex + 1);
    for (let oneRow of endingRows) {
      for (const fieldName of templateFieldNamesRef.current ?? []) {
        oneRow.values[
          fieldName
        ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
      }
      currentIndex++;
    }
    setFieldRows([...beginningRows, ...endingRows]);
  };
  const pop = () => {
    remove(fieldRows.length - 1);
  };
  const swap = (indexA: number, indexB: number) => {
    if (
      !(
        indexA >= 0 &&
        indexA < fieldRows.length &&
        indexB >= 0 &&
        indexB < fieldRows.length &&
        indexA !== indexB
      )
    ) {
      return;
    }
    const fieldRowsCopy = fieldRows.slice(0);
    const rowA = fieldRowsCopy[indexA];
    const rowB = fieldRowsCopy[indexB];
    for (const fieldName of templateFieldNamesRef.current ?? []) {
      const tempName = rowA.values[fieldName].name;
      rowA.values[fieldName].name = rowB.values[fieldName].name;
      rowB.values[fieldName].name = tempName;
    }
    const rowBCopy = fieldRowsCopy[indexB];
    fieldRowsCopy[indexB] = fieldRowsCopy[indexA];
    fieldRowsCopy[indexA] = rowBCopy;
    setFieldRows(fieldRowsCopy);
  };
  const move = (from: number, to: number) => {
    if (
      !(
        from >= 0 &&
        from < fieldRows.length &&
        to >= 0 &&
        to < fieldRows.length &&
        from !== to
      )
    ) {
      return;
    }
    const [small, big] = from < to ? [from, to] : [to, from];
    const beginningRows = fieldRows.slice(0, small);
    const endingRows = fieldRows.slice(big + 1);
    const middleRows = fieldRows.slice(small, big + 1);
    if (from < to) {
      let movingRow = middleRows.slice(0, 1)[0];
      let shiftingRows = middleRows.slice(1);
      let currentIndex = from;
      for (let fieldRow of shiftingRows) {
        for (const fieldName of templateFieldNamesRef.current ?? []) {
          fieldRow.values[
            fieldName
          ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
        }
        currentIndex++;
      }
      for (const fieldName of templateFieldNamesRef.current ?? []) {
        movingRow.values[
          fieldName
        ].name = `${arrayFieldName}[${to}].${fieldName}`;
      }
      setFieldRows([
        ...beginningRows,
        ...shiftingRows,
        movingRow,
        ...endingRows,
      ]);
    } else {
      let shiftingRows = middleRows.slice(0, middleRows.length - 1);
      let movingRow = middleRows.slice(middleRows.length - 1)[0];
      let currentIndex = to + 1;
      for (let fieldRow of shiftingRows) {
        for (const fieldName of templateFieldNamesRef.current ?? []) {
          fieldRow.values[
            fieldName
          ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
        }
        currentIndex++;
      }
      for (const fieldName of templateFieldNamesRef.current ?? []) {
        movingRow.values[
          fieldName
        ].name = `${arrayFieldName}[${to}].${fieldName}`;
      }
      setFieldRows([
        ...beginningRows,
        movingRow,
        ...shiftingRows,
        ...endingRows,
      ]);
    }
  };
  const renderRows = (renderFn: RenderFn) => {
    return fieldRows.map((row, idx) =>
      renderFn({
        row,
        fields: templateFieldNamesRef.current?.slice?.() ?? [],
        rowIndex: idx,
        removeFn: remove,
      })
    );
  };
  const clearFieldArray = () => {
    setFieldRows([]);
    fieldRowInsertIndex.current = 0;
  };

  return {
    fieldRows,
    templateFieldNames: templateFieldNamesRef.current,
    clearFieldArray,
    unshift,
    push,
    insert,
    pop,
    remove,
    swap,
    move,
    renderRows,
  };
};

// {
//   if (typeof inititalValues === "object") {
//     //get our array field initial value
//     const arrayFieldValues: InititalValues[] = getIn(
//       inititalValues,
//       fieldName
//     );
//     //check if arrayFieldValue is array and is not empty
//     if (Array.isArray(arrayFieldValues) && arrayFieldValues.length > 0) {
//       //create a buffer array of arrayfield with keys and names
//       let buffer: TemplateFieldRow[] = [];
//       for (const _ of arrayFieldValues) {
//         const result = _insert(buffer.length, buffer);
//         if (Array.isArray(result)) {
//           buffer = result;
//         }
//       }
//       for (let i = 0; i < buffer.length; i++) {
//         const oneBuf = buffer[i];
//         for (const [_, value] of Object.entries(oneBuf.values)) {
//           const initVal: string = getIn(inititalValues, value.name) ?? "";
//           set(formField(value.key), (currVal) => ({
//             ...currVal,
//             value: initVal,
//             defaultValue: initVal,
//           }));
//         }
//       }
//       setFieldRows(buffer);
//     }
//   }
// }

// Initital Value Setter function
// React.useEffect(() => {
//   const defaultArrayValue: string | undefined = getIn(
//     formState.inititalValues,
//     arrayFieldName
//   );
//   if (defaultArrayValue !== undefined && Array.isArray(defaultArrayValue)) {
//     fieldRowInsertIndex.current = -1;
//     let buffer: TemplateFieldRow[] = [];
//     for (const _ of defaultArrayValue) {
//       const result = _insert(buffer.length, buffer);
//       if (Array.isArray(result)) {
//         buffer = result;
//       }
//     }
//     setFieldRows(buffer);
//   }
// }, [formState.resetFlagForInitValues]);
