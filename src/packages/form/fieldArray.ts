import React from "react";
import {
  UseFieldArrayHookProps,
  TemplateFieldRowType,
  RenderFn,
  InitialValuesType,
  FormArrayFieldRowsAtomType,
} from "./types";
import {
  formArrayFieldRowsAtom,
  formArrayFieldResetCounterAtom,
} from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { getIn } from "./util";
import { FormContext } from "./context";

export const useFieldArray = ({
  arrayFieldName,
  template,
}: UseFieldArrayHookProps) => {
  if ((template ?? null) === null) {
    throw new Error("Pass a valid template object");
  }
  if ((arrayFieldName ?? "") === "") {
    throw new Error("Pass ArrayField name");
  }
  const formContext = React.useContext(FormContext);
  const fieldRowsRef = React.useRef<FormArrayFieldRowsAtomType>({
    templateFieldRows: [],
    lastInsertIndex: -1,
  });
  const [fieldRows, setFieldRows] = useRecoilState(
    formArrayFieldRowsAtom(`${formContext.formName}/${arrayFieldName}`)
  );
  fieldRowsRef.current = fieldRows;

  //caching template keys
  let templateFieldNamesRef = React.useRef<string[] | null>(null);
  if (templateFieldNamesRef.current === null) {
    templateFieldNamesRef.current = Object.keys(template);
  }

  //this functions accept index and current fieldRows as arguments to make it independent and to be used
  //where you want to bulk insert without setting setState on every insert - shaving off extra rerenders.
  const _insert = React.useCallback(
    (
      index: number,
      rowBuf: TemplateFieldRowType[],
      lastInsertId: number,
      template: string[] | null
    ) => {
      if (index >= 0 && index <= rowBuf.length) {
        const insertIndex = ++lastInsertId;
        let newRow: TemplateFieldRowType = {
          cells: {},
          fieldKey: `${formContext.formName}/${arrayFieldName}/${insertIndex}`,
        };
        for (const fieldName of template ?? []) {
          const key = `${arrayFieldName}[${insertIndex}].${fieldName}`;
          const name = `${arrayFieldName}[${index}].${fieldName}`;
          newRow.cells[fieldName] = { key, name };
        }
        const beginningRows = rowBuf.slice(0, index);
        const endingRows = rowBuf.slice(index);
        let currentIndex = index + 1;
        for (let oneRow of endingRows) {
          for (const fieldName of template ?? []) {
            oneRow.cells[
              fieldName
            ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
          }
          currentIndex++;
        }
        return {
          newRows: [...beginningRows, newRow, ...endingRows],
          lastIndex: insertIndex,
        };
      }
      return;
    },
    [arrayFieldName, formContext.formName]
  );

  const insert = React.useCallback(
    (index: number) => {
      const result = _insert(
        index,
        fieldRowsRef.current.templateFieldRows,
        fieldRowsRef.current.lastInsertIndex,
        templateFieldNamesRef.current
      );
      if (result !== undefined) {
        if (Array.isArray(result.newRows)) {
          setFieldRows({
            lastInsertIndex: result.lastIndex,
            templateFieldRows: result.newRows,
          });
        }
      }
    },
    [setFieldRows, _insert]
  );

  const push = React.useCallback(() => {
    const result = _insert(
      fieldRowsRef.current.templateFieldRows.length,
      fieldRowsRef.current.templateFieldRows,
      fieldRowsRef.current.lastInsertIndex,
      templateFieldNamesRef.current
    );
    if (result !== undefined) {
      setFieldRows({
        lastInsertIndex: result.lastIndex,
        templateFieldRows: result.newRows,
      });
    }
  }, [setFieldRows, _insert]);

  const unshift = React.useCallback(() => {
    const result = _insert(
      0,
      fieldRowsRef.current.templateFieldRows,
      fieldRowsRef.current.lastInsertIndex,
      templateFieldNamesRef.current
    );
    if (result !== undefined) {
      if (Array.isArray(result.newRows)) {
        setFieldRows({
          lastInsertIndex: result.lastIndex,
          templateFieldRows: result.newRows,
        });
      }
    }
  }, [setFieldRows, _insert]);

  const remove = React.useCallback(
    (index: number) => {
      if (index >= 0 && index < fieldRowsRef.current.templateFieldRows.length) {
        let currentIndex = index;
        const beginningRows = fieldRowsRef.current.templateFieldRows.slice(
          0,
          currentIndex
        );
        const endingRows = fieldRowsRef.current.templateFieldRows.slice(
          currentIndex + 1
        );
        for (let oneRow of endingRows) {
          for (const fieldName of templateFieldNamesRef.current ?? []) {
            oneRow.cells[
              fieldName
            ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
          }
          currentIndex++;
        }
        setFieldRows((oldValues) => ({
          templateFieldRows: [...beginningRows, ...endingRows],
          lastInsertIndex: oldValues.lastInsertIndex,
        }));
      }
    },
    [setFieldRows, arrayFieldName]
  );

  const pop = React.useCallback(() => {
    remove(fieldRowsRef.current.templateFieldRows.length - 1);
  }, [remove]);

  const swap = React.useCallback(
    (indexA: number, indexB: number) => {
      if (
        indexA >= 0 &&
        indexA < fieldRowsRef.current.templateFieldRows.length &&
        indexB >= 0 &&
        indexB < fieldRowsRef.current.templateFieldRows.length &&
        indexA !== indexB
      ) {
        const fieldRowsCopy = fieldRowsRef.current.templateFieldRows.slice(0);
        const rowA = fieldRowsCopy[indexA];
        const rowB = fieldRowsCopy[indexB];
        for (const fieldName of templateFieldNamesRef.current ?? []) {
          const tempName = rowA.cells[fieldName].name;
          rowA.cells[fieldName].name = rowB.cells[fieldName].name;
          rowB.cells[fieldName].name = tempName;
        }
        const rowBCopy = fieldRowsCopy[indexB];
        fieldRowsCopy[indexB] = fieldRowsCopy[indexA];
        fieldRowsCopy[indexA] = rowBCopy;
        setFieldRows((oldValues) => ({
          templateFieldRows: fieldRowsCopy,
          lastInsertIndex: oldValues.lastInsertIndex,
        }));
      }
    },
    [setFieldRows]
  );
  const move = React.useCallback(
    (from: number, to: number) => {
      if (
        from >= 0 &&
        from < fieldRowsRef.current.templateFieldRows.length &&
        to >= 0 &&
        to < fieldRowsRef.current.templateFieldRows.length &&
        from !== to
      ) {
        const [small, big] = from < to ? [from, to] : [to, from];
        const beginningRows = fieldRowsRef.current.templateFieldRows.slice(
          0,
          small
        );
        const endingRows = fieldRowsRef.current.templateFieldRows.slice(
          big + 1
        );
        const middleRows = fieldRowsRef.current.templateFieldRows.slice(
          small,
          big + 1
        );
        if (from < to) {
          let movingRow = middleRows.slice(0, 1)[0];
          let shiftingRows = middleRows.slice(1);
          let currentIndex = from;
          for (let fieldRow of shiftingRows) {
            for (const fieldName of templateFieldNamesRef.current ?? []) {
              fieldRow.cells[
                fieldName
              ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
            }
            currentIndex++;
          }
          for (const fieldName of templateFieldNamesRef.current ?? []) {
            movingRow.cells[
              fieldName
            ].name = `${arrayFieldName}[${to}].${fieldName}`;
          }
          setFieldRows((oldValues) => ({
            templateFieldRows: [
              ...beginningRows,
              ...shiftingRows,
              movingRow,
              ...endingRows,
            ],
            lastInsertIndex: oldValues.lastInsertIndex,
          }));
        } else {
          let shiftingRows = middleRows.slice(0, middleRows.length - 1);
          let movingRow = middleRows.slice(middleRows.length - 1)[0];
          let currentIndex = to + 1;
          for (let fieldRow of shiftingRows) {
            for (const fieldName of templateFieldNamesRef.current ?? []) {
              fieldRow.cells[
                fieldName
              ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
            }
            currentIndex++;
          }
          for (const fieldName of templateFieldNamesRef.current ?? []) {
            movingRow.cells[
              fieldName
            ].name = `${arrayFieldName}[${to}].${fieldName}`;
          }
          setFieldRows((oldValues) => ({
            templateFieldRows: [
              ...beginningRows,
              movingRow,
              ...shiftingRows,
              ...endingRows,
            ],
            lastInsertIndex: oldValues.lastInsertIndex,
          }));
        }
      }
    },
    [setFieldRows, arrayFieldName]
  );
  const renderRows = React.useCallback(
    (renderFn: RenderFn) => {
      return fieldRowsRef.current.templateFieldRows.map((row, idx) => {
        return renderFn({
          row,
          fields: templateFieldNamesRef.current?.slice?.() ?? [],
          rowIndex: idx,
          removeFn: remove,
        });
      });
    },
    [remove]
  );

  const clearFieldArray = React.useCallback(() => {
    setFieldRows({
      templateFieldRows: [],
      lastInsertIndex: -1,
    });
  }, [setFieldRows]);

  const setDefaultValue = React.useCallback(
    (initValues: InitialValuesType) => {
      const defaultArrayValue: string | undefined = getIn(
        initValues,
        arrayFieldName
      );
      if (defaultArrayValue !== undefined && Array.isArray(defaultArrayValue)) {
        let insertIndex = -1;
        let buffer: TemplateFieldRowType[] = [];
        for (let i = 0; i < defaultArrayValue.length; i++) {
          const result = _insert(
            buffer.length,
            buffer,
            insertIndex,
            templateFieldNamesRef.current
          );
          if (result !== undefined) {
            insertIndex = result.lastIndex;
            if (Array.isArray(result.newRows)) {
              buffer = result.newRows;
            }
          }
        }
        setFieldRows({
          templateFieldRows: buffer,
          lastInsertIndex: insertIndex,
        });
      }
    },
    [arrayFieldName, setFieldRows, _insert]
  );
  const currentCounter = useRecoilValue(
    formArrayFieldResetCounterAtom(formContext.formName)
  );
  React.useEffect(() => {
    if (
      typeof formContext.initialValues === "object" &&
      Object.keys(formContext.initialValues).length > 0
    ) {
      setDefaultValue(formContext.initialValues);
    }
  }, [currentCounter, setDefaultValue, formContext.initialValues]);

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
