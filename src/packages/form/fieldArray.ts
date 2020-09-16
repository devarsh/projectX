import React from "react";
import {
  UseFieldArrayHookProps,
  TemplateFieldRowType,
  RenderFn,
  InititalValuesAtomType,
} from "./types";
import {
  formInitialValuesAtom,
  formFieldAtom,
  formArrayFieldRowsAtom,
} from "./atoms";
import { useRecoilValue, useRecoilCallback, useRecoilState } from "recoil";
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
  const [fieldRows, setFieldRows] = useRecoilState(
    formArrayFieldRowsAtom(`${formContext.formName}/${arrayFieldName}`)
  );
  //caching template keys
  let templateFieldNamesRef = React.useRef<string[] | null>(null);
  if (templateFieldNamesRef.current === null) {
    templateFieldNamesRef.current = Object.keys(template);
  }

  //this functions accept index and current fieldRows as arguments to make it independent and to be used
  //where you want to bulk insert without setting setState on every insert - shaving off extra rerenders.
  const _insert = (
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
  };

  const insert = (index: number) => {
    const result = _insert(
      index,
      fieldRows.templateFieldRows,
      fieldRows.lastInsertIndex,
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
  };

  const push = () => {
    const result = _insert(
      fieldRows.templateFieldRows.length,
      fieldRows.templateFieldRows,
      fieldRows.lastInsertIndex,
      templateFieldNamesRef.current
    );
    if (result !== undefined) {
      setFieldRows({
        lastInsertIndex: result.lastIndex,
        templateFieldRows: result.newRows,
      });
    }
  };
  const unshift = () => {
    const result = _insert(
      0,
      fieldRows.templateFieldRows,
      fieldRows.lastInsertIndex,
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
  };
  const remove = (index: number) => {
    if (index >= 0 && index < fieldRows.templateFieldRows.length) {
      let currentIndex = index;
      const beginningRows = fieldRows.templateFieldRows.slice(0, currentIndex);
      const endingRows = fieldRows.templateFieldRows.slice(currentIndex + 1);
      debugger;
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
  };
  const pop = () => {
    remove(fieldRows.templateFieldRows.length - 1);
  };
  const swap = (indexA: number, indexB: number) => {
    if (
      indexA >= 0 &&
      indexA < fieldRows.templateFieldRows.length &&
      indexB >= 0 &&
      indexB < fieldRows.templateFieldRows.length &&
      indexA !== indexB
    ) {
      const fieldRowsCopy = fieldRows.templateFieldRows.slice(0);
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
  };
  const move = (from: number, to: number) => {
    if (
      from >= 0 &&
      from < fieldRows.templateFieldRows.length &&
      to >= 0 &&
      to < fieldRows.templateFieldRows.length &&
      from !== to
    ) {
      const [small, big] = from < to ? [from, to] : [to, from];
      const beginningRows = fieldRows.templateFieldRows.slice(0, small);
      const endingRows = fieldRows.templateFieldRows.slice(big + 1);
      const middleRows = fieldRows.templateFieldRows.slice(small, big + 1);
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
  };
  const renderRows = (renderFn: RenderFn) => {
    return fieldRows.templateFieldRows.map((row, idx) => {
      return renderFn({
        row,
        fields: templateFieldNamesRef.current?.slice?.() ?? [],
        rowIndex: idx,
        removeFn: remove,
      });
    });
  };
  const clearFieldArray = () => {
    setFieldRows({
      templateFieldRows: [],
      lastInsertIndex: -1,
    });
  };

  const setDefaultValue = React.useCallback(
    useRecoilCallback(({ set }) => (initValues: InititalValuesAtomType) => {
      const defaultArrayValue: string | undefined = getIn(
        initValues.initialValues,
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
        for (const oneBuf of buffer) {
          for (const value of Object.values(oneBuf.cells)) {
            const initVal: string =
              getIn(initValues.initialValues, value.name) ?? "";
            set(
              formFieldAtom(`${formContext.formName}/${value.key}`),
              (currVal) => ({
                ...currVal,
                value: initVal,
              })
            );
          }
        }
        setFieldRows({
          templateFieldRows: buffer,
          lastInsertIndex: insertIndex,
        });
      }
    }),
    [arrayFieldName]
  );

  const initialValues = useRecoilValue(
    formInitialValuesAtom(formContext.formName)
  );

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
