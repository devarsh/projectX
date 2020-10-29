import { singletonFunctionRegisrationFactory } from "components/dyanmicForm";

const { registerFn } = singletonFunctionRegisrationFactory;

const function1 = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        { label: "Select Salutation", value: "0" },
        { label: "Mr", value: "1" },
        { label: "Mrs", value: "2" },
        { label: "Miss", value: "3" },
      ]);
    }, 1000);
  });
};

registerFn("functionOne", function1);
