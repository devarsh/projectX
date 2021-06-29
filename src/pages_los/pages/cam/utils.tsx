import { Amount, Percentage, Default } from "pages_los/pages/cam/components";
import { Fragment } from "react";
export const printTDSForAmount = ({ obj, key }: any) => (
  <Fragment key={key}>
    <Amount
      key={0}
      colspan={2}
      value={obj[0]?.[key]}
      align="right"
      skipSymbol={true}
    />
    <Amount
      key={1}
      colspan={2}
      value={obj[1]?.[key]}
      align="right"
      skipSymbol={true}
    />
    <Amount
      key={2}
      colspan={2}
      value={obj[2]?.[key]}
      align="right"
      skipSymbol={true}
    />
    <Amount
      key={3}
      colspan={1}
      value={obj[3]?.[key]}
      align="right"
      skipSymbol={true}
    />
    <Amount
      key={4}
      colspan={1}
      value={obj[4]?.[key]}
      align="right"
      skipSymbol={true}
    />
  </Fragment>
);

export const printTDSForPercentage = ({ obj, key }: any) => (
  <Fragment key={key}>
    <Percentage colspan={2} value={obj[0]?.[key]} align="right" key={0} />
    <Percentage colspan={2} value={obj[1]?.[key]} align="right" key={1} />
    <Percentage colspan={2} value={obj[2]?.[key]} align="right" key={2} />
    <Percentage colspan={1} value={obj[3]?.[key]} align="right" key={3} />
    <Percentage colspan={1} value={obj[4]?.[key]} align="right" key={4} />
  </Fragment>
);

export const printTDS = ({ obj, key }) => (
  <Fragment key={key}>
    <Default colspan={2} value={obj[0]?.[key]} align="right" key={0} />
    <Default colspan={2} value={obj[1]?.[key]} align="right" key={1} />
    <Default colspan={2} value={obj[2]?.[key]} align="right" key={2} />
    <Default colspan={1} value={obj[3]?.[key]} align="right" key={3} />
    <Default colspan={1} value={obj[4]?.[key]} align="right" key={4} />
  </Fragment>
);

export const convertIntoCurrency = ({ amount }) => {
  let formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "INR",
  });
  try {
    return formatter.format(Number(amount));
  } catch (e) {
    return "NAN";
  }
};

export const convertIntoPrcentage = ({ amount }) => {
  return `${amount}%`;
};

export const DefaultTDS = ({ obj, key }: any) => (
  <Fragment>
    <Default colspan={2} value={obj[0]?.[key]} align="right" key={0} />
    <Default colspan={2} value={obj[1]?.[key]} align="right" key={1} />
    <Default colspan={3} value={obj[2]?.[key]} align="right" key={2} />
  </Fragment>
);

export const AmountTDS = ({ obj, key }: any) => (
  <Fragment>
    <Amount colspan={2} value={obj[0]?.[key]} align="right" key={0} />
    <Amount colspan={2} value={obj[1]?.[key]} align="right" key={1} />
    <Amount colspan={3} value={obj[2]?.[key]} align="right" key={2} />
  </Fragment>
);

export const CalculateTotal = ({ obj, key }: any) => {
  if (!Array.isArray(obj) || obj.length <= 0) {
    return null;
  }
  const total = obj.reduce((previous, one) => {
    const accum = previous + one?.[key];
    return accum;
  }, 0);
  return total;
};
