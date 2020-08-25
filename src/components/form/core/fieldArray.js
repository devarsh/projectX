import React from "react";

const useFormArray = ({ arrayFieldName, template }) => {
  if ((template ?? null) === null) {
    throw new Error("Pass a valid template object");
  }
  if ((arrayFieldName ?? "") === "") {
    throw new Error("Pass ArrayField name");
  }
  const [fieldRows, setFieldRows] = React.useState([]);
  const fieldRowInsertIndex = React.useRef(0);
  //caching template keys
  let templateFieldNamesRef = React.useRef(null);
  if (templateFieldNamesRef.current === null) {
    templateFieldNamesRef.current = Object.keys(template);
  }
  let templateFieldNames = templateFieldNamesRef.current;

  const insert = (index) => {
    if (!(index >= 0 && index <= fieldRows.length)) {
      return;
    }
    const insertIndex = fieldRowInsertIndex.current++;
    let newRow = { values: {}, fieldKey: `${arrayFieldName}-${insertIndex}` };
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
  const remove = (index) => {
    if (!(index >= 0 && index < fieldRows.length)) {
      return;
    }
    let currentIndex = index;
    const beginningRows = fieldRows.slice(0, currentIndex);
    const endingRows = fieldRows.slice(currentIndex + 1);
    console.log(beginningRows, endingRows);
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
  const swap = (indexA, indexB) => {
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
  const move = (from, to) => {
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
      const movingRow = middleRows.slice(0, 1)[0];
      const shiftingRows = middleRows.slice(1);
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
      const shiftingRows = middleRows.slice(0, middleRows.length - 1);
      const movingRow = middleRows.slice(middleRows.length - 1)[0];
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
  return { fieldRows, unshift, push, insert, pop, remove, swap, move };
};

const FormArray = ({ arrayFieldName, template }) => {
  const [index, setIndex] = React.useState(0);
  const [index2, setIndex2] = React.useState(1);
  const {
    fieldRows,
    unshift,
    push,
    insert,
    pop,
    remove,
    swap,
    move,
  } = useFormArray({
    arrayFieldName,
    template,
  });
  const fields = Object.keys(template);
  const rows = fieldRows.map((row, idx) => {
    const keys = fields.map((key) => {
      return (
        <Field
          name={row.values[key].name}
          key={row.values[key].key}
          dataKey={row.values[key].key}
          index={idx}
        />
      );
    });
    return (
      <div key={row.fieldKey}>
        {keys}
        <button onClick={() => remove(idx)}> Delete</button>
      </div>
    );
  });
  return (
    <div>
      <button onClick={() => push()}>push</button>
      <button onClick={() => unshift()}>unshift</button>
      <button onClick={() => insert(index)}>insert</button>
      <button onClick={() => pop()}>pop</button>
      <button onClick={() => swap(index, index2)}>swap</button>
      <button onClick={() => move(index, index2)}>move</button>

      <br />
      <label>InsertAt/From/IndexA</label>
      <input
        type="number"
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
      />
      <br />
      <label>RemoveAt/To/IndexB</label>
      <input
        type="number"
        value={index2}
        onChange={(e) => setIndex2(Number(e.target.value))}
      />
      <div>{rows}</div>
    </div>
  );
};

const Field = ({ name, dataKey, index }) => {
  React.useEffect(() => {
    console.log("mounted", dataKey, name, index);
    return () => console.log("unmounted", dataKey, name, index);
  }, [dataKey]);
  return (
    <div>
      {dataKey} / {name} / {index}
    </div>
  );
};

//----------main---------

const FormMain = () => {
  return (
    <FormArray
      arrayFieldName="contact"
      template={{ street1: "", street2: "", city: "" }}
    />
  );
};

export default FormMain;
