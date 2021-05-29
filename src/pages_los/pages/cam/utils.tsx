import { Amount, Percentage } from "pages_los/pages/cam/components";
export const printTDSForAmount = ({ obj, key }: any) => {
  return [
    <td colSpan={2}>
      {
        //@ts-ignore
        <Amount value={obj[0]?.[key]} />
      }
    </td>,
    <td colSpan={2}>
      {
        //@ts-ignore
        <Amount value={obj[1]?.[key]} />
      }
    </td>,
    <td colSpan={2}>
      {
        //@ts-ignore
        <Amount value={obj[2]?.[key]} />
      }
    </td>,
  ];
};

export const printTDSForPercentage = ({ obj, key }: any) => {
  return [
    <td colSpan={2}>
      {
        //@ts-ignore
        <Percentage value={obj[0]?.[key]} />
      }
    </td>,
    <td colSpan={2}>
      {
        //@ts-ignore
        <Percentage value={obj[1]?.[key]} />
      }
    </td>,
    <td colSpan={2}>
      {
        //@ts-ignore
        <Percentage value={obj[2]?.[key]} />
      }
    </td>,
  ];
};

export const printTDS = ({ obj, key }) => {
  return [
    <td colSpan={2}>{obj[0]?.[key]}</td>,
    <td colSpan={2}>{obj[1]?.[key]}</td>,
    <td colSpan={2}>{obj[2]?.[key]}</td>,
  ];
};

export const dateFormatter = ({ val }) => {
  let date = new Date(val);
  //@ts-ignore
  if (isNaN(date)) {
    return "Invalid Date";
  } else {
    let formatter = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formatter.format(date);
  }
};

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
