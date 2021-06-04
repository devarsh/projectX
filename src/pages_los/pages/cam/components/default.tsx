import { createElement } from "react";

export const Default = ({
  value,
  colspan = undefined,
  align = "left",
  element = "td",
  ...others
}: any) => {
  let result = "-";
  if (Boolean(value)) {
    result = value;
  }
  if (!isNaN(Number(colspan))) {
    return createElement(
      element,
      {
        colspan,
        style: { textAlign: align },
        ...others,
      },
      result
    );
  } else {
    return <>{result}</>;
  }
};
