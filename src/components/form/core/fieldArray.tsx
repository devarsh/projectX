import React from "react";

type RenderFn = (
  row: TemplateFieldRow,
  fields: string[],
  rowIndex: number
) => any;

interface FieldArrayProps {
  arrayFieldName: string;
  template: any;
}

interface TemplateFieldRow {
  fieldKey: string;
  values: {
    [key: string]: TemplateFieldRowValue;
  };
}

interface TemplateFieldRowValue {
  name: string;
  key: string;
}

interface FieldProps extends TemplateFieldRowValue {
  index: number;
  dataKey: string;
}

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
  const fieldRowInsertIndex = React.useRef(0);
  //caching template keys
  let templateFieldNamesRef = React.useRef<string[] | null>(null);
  if (templateFieldNamesRef.current === null) {
    templateFieldNamesRef.current = Object.keys(template);
  }
  let templateFieldNames = templateFieldNamesRef.current;

  const insert = (index: number) => {
    if (!(index >= 0 && index <= fieldRows.length)) {
      return;
    }
    const insertIndex = fieldRowInsertIndex.current++;
    let newRow: TemplateFieldRow = {
      values: {},
      fieldKey: `${arrayFieldName}-${insertIndex}`,
    };
    for (const fieldName of templateFieldNames) {
      const key = `${arrayFieldName}[${insertIndex}].${fieldName}`;
      const name = `${arrayFieldName}[${index}].${fieldName}`;
      newRow.values[fieldName] = { key, name };
    }
    const beginningRows = fieldRows.slice(0, index);
    const endingRows = fieldRows.slice(index);
    let currentIndex = index + 1;
    for (let oneRow of endingRows) {
      for (const fieldName of templateFieldNames) {
        oneRow.values[
          fieldName
        ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
      }
      currentIndex++;
    }
    setFieldRows([...beginningRows, newRow, ...endingRows]);
  };

  const push = () => {
    insert(fieldRows.length);
  };
  const unshift = () => {
    insert(0);
  };
  const remove = (index: number) => {
    if (!(index >= 0 && index < fieldRows.length)) {
      return;
    }
    let currentIndex = index;
    const beginningRows = fieldRows.slice(0, currentIndex);
    const endingRows = fieldRows.slice(currentIndex + 1);
    for (let oneRow of endingRows) {
      for (const fieldName of templateFieldNames) {
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
    for (const fieldName of templateFieldNames) {
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
        for (const fieldName of templateFieldNames) {
          fieldRow.values[
            fieldName
          ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
        }
        currentIndex++;
      }
      for (const fieldName of templateFieldNames) {
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
        for (const fieldName of templateFieldNames) {
          fieldRow.values[
            fieldName
          ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
        }
        currentIndex++;
      }
      for (const fieldName of templateFieldNames) {
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
      renderFn(row, templateFieldNames.slice(), idx)
    );
  };
  return {
    fieldRows,
    templateFieldNames,
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

const Field: React.FC<FieldProps> = ({ dataKey, name, index }): any => {
  let renderCount = React.useRef(0);
  React.useEffect(() => {
    console.log("mounted:", dataKey);
    return () => console.log("unmounted:", dataKey);
  }, []);
  console.log("render count---", dataKey, ":", renderCount.current++);
  return (
    <div>
      {dataKey} / {name} / {index}
    </div>
  );
};

const FormMain: React.FC = () => {
  const { renderRows, push, remove } = useFieldArray({
    arrayFieldName: "demo",
    template: { name: "", surname: "", age: "" },
  });
  const rows = renderRows((row, fields, index) => {
    let result = fields.map((field) => {
      return (
        <Field
          dataKey={row.values[field].key}
          key={row.values[field].key}
          name={row.values[field].name}
          index={index}
        />
      );
    });
    return (
      <div key={row.fieldKey}>
        {result}
        <button onClick={() => remove(index)}>Delete</button>
      </div>
    );
  });
  return (
    <div>
      <button onClick={() => push()}>push</button>
      <br />
      <div key="content">{rows}</div>
    </div>
  );
};

export default FormMain;
