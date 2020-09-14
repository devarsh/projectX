import React from "react";
import {
  FieldArrayProps,
  TemplateFieldRow,
  RenderFn,
  InititalValuesVer,
} from "./types";
import { initialValuesAtom, formField } from "./atoms";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { getIn } from "./util";
import { FormNameContext } from "./context";

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
  const formName = React.useContext(FormNameContext);
  const [fieldRows, setFieldRows] = React.useState<TemplateFieldRow[]>([]);
  const fieldRowInsertIndex = React.useRef(0);
  //caching template keys
  let templateFieldNamesRef = React.useRef<string[] | null>(null);
  if (templateFieldNamesRef.current === null) {
    templateFieldNamesRef.current = Object.keys(template);
  }

  //this functions accept index and current fieldRows as arguments to make it independent and to be used
  //where you want to bulk insert without setting setState on every insert - shaving off extra rerenders.
  const _insert = React.useCallback(
    (index: number, rowBuf: TemplateFieldRow[]) => {
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
    },
    [arrayFieldName]
  );

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

  const setDefaultValue = React.useCallback(
    useRecoilCallback(({ set }) => (initValues: InititalValuesVer) => {
      const defaultArrayValue: string | undefined = getIn(
        initValues.initialValues,
        arrayFieldName
      );
      if (defaultArrayValue !== undefined && Array.isArray(defaultArrayValue)) {
        fieldRowInsertIndex.current = 0;
        let buffer: TemplateFieldRow[] = [];
        for (let i = 0; i < defaultArrayValue.length; i++) {
          const result = _insert(buffer.length, buffer);
          if (Array.isArray(result)) {
            buffer = result;
          }
        }
        for (const oneBuf of buffer) {
          for (const value of Object.values(oneBuf.values)) {
            console.log(value.name, value.key);
            const initVal: string =
              getIn(initValues.initialValues, value.name) ?? "";
            set(formField(`${formName}/${value.key}`), (currVal) => ({
              ...currVal,
              value: initVal,
            }));
          }
        }
        setFieldRows(buffer);
      }
    }),
    [arrayFieldName]
  );

  const initialValues = useRecoilValue(initialValuesAtom(formName));

  React.useEffect(() => {
    setDefaultValue(initialValues);
  }, [initialValues.version, setDefaultValue]);

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
