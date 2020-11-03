import { Engine, Rule } from "json-rules-engine";

const engine = new Engine();

const rule = new Rule({
  conditions: {
    all: [
      {
        fact: "dependentValues",
        path: ".age.value",
        operator: "equal",
        value: {
          fact: "dependentValues",
          path: ".maxAge.value",
        },
      },
    ],
  },
  event: {
    type: "message",
    params: {
      value: true,
    },
  },
});

engine.addRule(rule);

const facts = {
  dependentValues: { age: { value: 25 }, maxAge: { value: 30 } },
};

engine
  .run(facts)
  //@ts-ignore
  .then((event) => console.log(event?.params))
  .catch((e) => console.log(e));
