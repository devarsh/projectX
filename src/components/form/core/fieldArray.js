import React from "react";
const __ContainerKey = Symbol("___ParentKey");

const useFormArray = ({ arrayFieldName, template }) => {
  if ((template ?? null) === null) {
    throw new Error("Pass a valid template object");
  }
  if ((arrayFieldName ?? "") === "") {
    throw new Error("Pass ArrayField name");
  }
  const [fieldRows, setFieldRows] = React.useState([]);
  const keyIndex = React.useRef(0);
  //caching template keys
  let fieldNamesRef = React.useRef(null);
  if (fieldNamesRef.current === null) {
    fieldNamesRef.current = Object.keys(template);
  }
  let fieldNames = fieldNamesRef.current;
  const push = () => {
    const newRow = {};
    const rowIndexPos = keyIndex.current++;
    for (const fieldName of fieldNames) {
      const key = `${arrayFieldName}[${rowIndexPos}].${fieldName}`;
      const name = `${arrayFieldName}[${fieldRows.length}].${fieldName}`;
      newRow[fieldName] = { key, name };
    }
    newRow[__ContainerKey] = `${arrayFieldName}-${rowIndexPos}`;
    setFieldRows([...fieldRows, newRow]);
  };
  const unshift = () => {
    const newRow = {};
    const rowIndexPos = keyIndex.current++;
    for (const fieldName of fieldNames) {
      const key = `${arrayFieldName}[${rowIndexPos}].${fieldName}`;
      const name = `${arrayFieldName}[0].${fieldName}`;
      newRow[fieldName] = { key, name };
    }
    newRow[__ContainerKey] = `${arrayFieldName}-${rowIndexPos}`;
    let currentIndex = 1;
    const nextFields = fieldRows.slice(0);
    for (let fieldRow of nextFields) {
      for (const fieldName of fieldNames) {
        fieldRow[
          fieldName
        ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
      }
      currentIndex++;
    }
    setFieldRows([newRow, ...nextFields]);
  };
  const insert = (index) => {
    if (index < 0 || index > fieldRows.length) {
      return;
    }
    const newRow = {};
    const rowIndexPos = keyIndex.current++;
    for (const fieldName of fieldNames) {
      const key = `${arrayFieldName}[${rowIndexPos}].${fieldName}`;
      const name = `${arrayFieldName}[${index}].${fieldName}`;
      newRow[fieldName] = { key, name };
    }
    newRow[__ContainerKey] = `${arrayFieldName}-${rowIndexPos}`;
    const prevFields = fieldRows.slice(0, index);
    const nextFields = fieldRows.slice(index);
    let currentIndex = index + 1;
    for (let fieldRow of nextFields) {
      for (const fieldName of fieldNames) {
        fieldRow[
          fieldName
        ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
      }
      currentIndex++;
    }
    setFieldRows([...prevFields, newRow, ...nextFields]);
  };
  const remove = (index) => {
    if (index > -1 && index > fieldRows.length - 1) {
      return;
    }
    let currentIndex = index;
    const prevFields = fieldRows.slice(0, currentIndex);
    const nextFields = fieldRows.slice(currentIndex + 1);
    for (let fieldRow of nextFields) {
      for (const fieldName of fieldNames) {
        fieldRow[
          fieldName
        ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
      }
      currentIndex++;
    }
    setFieldRows([...prevFields, ...nextFields]);
  };
  const pop = () => {
    const nextFields = fieldRows.slice(0, fieldRows.length - 1);
    setFieldRows(nextFields);
  };
  const swap = (indexA, indexB) => {
    if (
      !(
        indexA > -1 &&
        indexA < fieldRows.length &&
        indexB > -1 &&
        indexB < fieldRows.length
      )
    ) {
      return;
    }
    const newFields = fieldRows.slice(0);
    const indexAField = newFields[indexA];
    const indexBField = newFields[indexB];
    for (const fieldName of fieldNames) {
      const tempName = indexAField[fieldName].name;
      indexAField[fieldName].name = indexBField[fieldName].name;
      indexBField[fieldName].name = tempName;
    }
    const tempField = newFields[indexB];
    newFields[indexB] = newFields[indexA];
    newFields[indexA] = tempField;
    setFieldRows(newFields);
  };
  const move = (from, to) => {
    if (
      !(
        from > -1 &&
        from < fieldRows.length &&
        to > -1 &&
        to < fieldRows.length
      )
    ) {
      return;
    }
    const [small, big] = from < to ? [from, to] : [to, from];
    const prev = fieldRows.slice(0, small);
    const last = fieldRows.slice(big + 1);
    const remaning = fieldRows.slice(small, big + 1);
    if (from < to) {
      const first = remaning.slice(0, 1)[0];
      const others = remaning.slice(1);
      let currentIndex = from;
      for (let fieldRow of others) {
        for (const fieldName of fieldNames) {
          fieldRow[
            fieldName
          ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
        }
        currentIndex++;
      }
      for (const fieldName of fieldNames) {
        first[fieldName].name = `${arrayFieldName}[${to}].${fieldName}`;
      }
      setFieldRows([...prev, ...others, first, ...last]);
    } else {
      const first = remaning.slice(0, remaning.length - 1);
      const end = remaning.slice(remaning.length - 1)[0];
      let currentIndex = to + 1;
      for (let fieldRow of first) {
        for (const fieldName of fieldNames) {
          fieldRow[
            fieldName
          ].name = `${arrayFieldName}[${currentIndex}].${fieldName}`;
        }
        currentIndex++;
      }
      for (const fieldName of fieldNames) {
        end[fieldName].name = `${arrayFieldName}[${to}].${fieldName}`;
      }
      setFieldRows([...prev, end, ...first, ...last]);
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
  const rows = fieldRows.map((field, idx) => {
    const row = fields.map((col) => {
      return (
        <Field
          name={field[col].name}
          key={field[col].key}
          dataKey={field[col].key}
          index={idx}
        />
      );
    });
    return (
      <div key={field[__ContainerKey]}>
        {row}
        <button onClick={() => remove(index)}> Delete</button>
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
