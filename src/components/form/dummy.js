import * as yup from "yup";
import { yupValidationHelper } from "packages/form";
import React from "react";

let schema = yup.object().shape({
  name: yup.string().required().min(4).max(50),
  age: yup.number().required().min(18),
  contact: yup.array().of(
    yup.object().shape({
      tel: yup.number().required(),
      mob: yup.number().required().max(10),
    })
  ),
});
try {
  const mob = yup.reach(schema, "contac[100].mob");

  const res = yupValidationHelper(mob)({ value: "343453554" });
  console.log(res);
} catch (e) {
  console.log(e);
}

const App = () => {
  return <h1>Check console</h1>;
};

export default App;
