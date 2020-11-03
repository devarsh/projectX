import { Engine } from "json-rules-engine";

localStorage.debug = "json-rules-engine";

const ruleEngine = (rule) => async (data) => {
  const { success, failure, conditions } = rule;
  let engine = new Engine();
  const extendRule = {
    conditions: conditions,
    event: {
      type: "success",
      params: {
        message: null,
      },
    },
  };
  console.log(extendRule);
  engine.addRule(extendRule);
  const result = await engine.run(data);
  if (result.events.length > 0) {
    return success;
  } else {
    return failure;
  }
};

const x = {
  conditions: {
    all: [
      {
        fact: "dependentFields",
        path: "$.age.value",
        operator: "equal",
        value: 17,
      },
    ],
  },
  success: "YESSSS",
  failure: "fucked",
};

const y = ruleEngine(x);

y({ dependentFields: { age: { value: 17 } } }).then((result) =>
  console.log(result)
);
