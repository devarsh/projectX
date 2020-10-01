import React from "react";
import {
  UseFieldArrayHookProps,
  TemplateFieldRowType,
  RenderFn,
  InitialValuesType,
} from "./types";
import {
  formArrayFieldRowsAtom,
  formArrayFieldRegisterSelector,
  formArrayFieldUnregisterSelector,
} from "./atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getIn } from "./util";
import { FormContext } from "./context";

export const useFieldArray = ({
  arrayFieldName,
  template,
}: UseFieldArrayHookProps) => {
  //fromContext provides formName for scoping
  const formContext = React.useContext(FormContext);
  //caching template keys passed as object which are fields per row in the fieldArray
  let templateFieldNamesRef = React.useRef<string[]>(Object.keys(template));
  //fieldRows keeps track of fields in the field array,
  //also will keep track of last inserted field index which forms the
  //basis of fieldKey to uniquely identify field in the formFieldAtom
  //eg - arrayFieldName[index].templateFieldName
  const [fieldRows, setFieldRows] = useRecoilState(
    formArrayFieldRowsAtom(`${formContext.formName}/${arrayFieldName}`)
  );
  //fieldRowsRef for memoization purpose
  const fieldRowsRef = React.useRef(fieldRows);
  fieldRowsRef.current = fieldRows;

  //registerField function registers the currentField to the fields registry if not registered,
  //and keeping track of all the active array fields in the form
  const registerField = useSetRecoilState(
    formArrayFieldRegisterSelector(formContext.formName)
  );
  //unregisterField function unregistered the current arrayField from the fields registry
  const unregisterField = useSetRecoilState(
    formArrayFieldUnregisterSelector(formContext.formName)
  );

  //This effect will register and unregister fields when they mount and unmount
  //If an option is set not resetField on unmount unregister will not be called.
  React.useEffect(() => {
    registerField(`${formContext.formName}/${arrayFieldName}`);
    if (formContext.resetFieldOnUnmount === true) {
      return () => {
        unregisterField(`${formContext.formName}/${arrayFieldName}`);
      };
    }
  }, [
    registerField,
    unregisterField,
    formContext.formName,
    formContext.resetFieldOnUnmount,
    arrayFieldName,
  ]);

  //_insert adds a new field to the fieldArray with a new key
  const _insert = React.useCallback(
    (
      index: number,
      rowBuffer: TemplateFieldRowType[],
      lastInsertId: number,
      template: string[]
    ) => {
      if (index >= 0 && index <= rowBuffer.length) {
        const insertIndex = ++lastInsertId;
        let newRow: TemplateFieldRowType = {
          cells: {},
          fieldIndexKey: `${formContext.formName}/${arrayFieldName}/${insertIndex}`,
        };
        for (const fieldName of template) {
          const key = `${arrayFieldName}[${insertIndex}].${fieldName}`;
          const name = `${arrayFieldName}[${index}].${fieldName}`;
          newRow.cells[fieldName] = { key, name };
        }
        const beginningRows = rowBuffer.slice(0, index);
        const endingRows = rowBuffer.slice(index);
        let currentIndex = index + 1;
        for (let oneRow of endingRows) {
          for (const fieldName of template) {
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
  //remove field from the fieldArray
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
          ...oldValues,
          templateFieldRows: [...beginningRows, ...endingRows],
          lastInsertIndex: oldValues.lastInsertIndex,
        }));
      }
    },
    [setFieldRows, arrayFieldName]
  );
  //Initialize the form array with default rows
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
          resetFlag: false,
          templateFieldRows: buffer,
          lastInsertIndex: insertIndex,
        });
      }
    },
    [arrayFieldName, setFieldRows, _insert]
  );
  //triggers fieldArray reset
  React.useEffect(() => {
    if (
      fieldRows.resetFlag === true &&
      typeof formContext.initialValues === "object" &&
      Object.keys(formContext.initialValues).length > 0
    ) {
      setDefaultValue(formContext.initialValues);
    }
  }, [fieldRows.resetFlag, setDefaultValue, formContext.initialValues]);

  //utility function to renderRows
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
  //clearFieldArray when clearFn is called
  const clearFieldArray = React.useCallback(() => {
    setFieldRows({
      templateFieldRows: [],
      lastInsertIndex: -1,
      resetFlag: false,
    });
  }, [setFieldRows]);

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
          setFieldRows((old) => ({
            ...old,
            lastInsertIndex: result.lastIndex,
            templateFieldRows: result.newRows,
          }));
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
      setFieldRows((old) => ({
        ...old,
        lastInsertIndex: result.lastIndex,
        templateFieldRows: result.newRows,
      }));
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
        setFieldRows((old) => ({
          ...old,
          lastInsertIndex: result.lastIndex,
          templateFieldRows: result.newRows,
        }));
      }
    }
  }, [setFieldRows, _insert]);

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
          ...oldValues,
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
            ...oldValues,
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
            ...oldValues,
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
