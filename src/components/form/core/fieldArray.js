import React from "react";
const __ParentKey = Symbol("___ParentKey");
//const abc = [{ key: "dsfdfs", name: "dsdffds" }];

const useFormArray = ({ name, templateObj }) => {
  const atomIndex = React.useRef(0);
  const [fieldRows, setFieldRows] = React.useState([]);
  const push = () => {
    const fields = Object.keys(templateObj);
    const newObj = {};
    const atomDerivedKey = atomIndex.current++;
    for (const field of fields) {
      const key = `${name}[${atomDerivedKey}].${field}`;
      const fieldName = `${name}[${fieldRows.length}].${field}`;
      newObj[field] = { key, fieldName };
    }
    newObj[__ParentKey] = `${name}-${atomDerivedKey}`;
    const newFieldRows = [...fieldRows, newObj];
    setFieldRows(newFieldRows);
  };
  const deleteAt = (index) => {
    let currentIndex = index;
    const prev = fieldRows.slice(0, index);
    const next = fieldRows.slice(index + 1);
    const fields = Object.keys(templateObj);
    for (let one of next) {
      for (const field of fields) {
        one[field].fieldName = `${name}[${currentIndex}].${field}`;
      }
      currentIndex++;
    }
    const newFieldRows = [...prev, ...next];
    setFieldRows(newFieldRows);
  };
  return { fieldRows, push, deleteAt };
};

const FormArray = ({ name, templateObj }) => {
  const [index, setIndex] = React.useState(0);
  const { fieldRows, push, deleteAt } = useFormArray({ name, templateObj });
  const fields = Object.keys(templateObj);
  const rows = fieldRows.map((field, index) => {
    const row = fields.map((col) => {
      return (
        <Field
          name={field[col].fieldName}
          key={field[col].key}
          dataKey={field[col].key}
          index={index}
        />
      );
    });
    return (
      <div key={field[__ParentKey]}>
        {row}
        <button onClick={() => deleteAt(index)}> Delete</button>
      </div>
    );
  });
  return (
    <div>
      <button onClick={() => push()}>push</button>
      <label>Index To delete</label>
      <input
        type="number"
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
      />
      <div>{rows}</div>
    </div>
  );
};

const Field = ({ name, dataKey, index }) => {
  React.useEffect(() => {
    console.log("mounted", name, dataKey, index);
    return () => console.log("unmounted", name, dataKey, index);
  }, []);
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
      name="contact"
      templateObj={{ street1: "", street2: "", city: "" }}
    />
  );
};

export default FormMain;
