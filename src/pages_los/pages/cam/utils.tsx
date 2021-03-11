export const printTDS = ({ obj, key }) => {
  return [
    <td colSpan={2}>{obj[0]?.[key]}</td>,
    <td colSpan={2}>{obj[1]?.[key]}</td>,
    <td colSpan={2}>{obj[2]?.[key]}</td>,
  ];
};

export const dateFormatter = ({ val }) => {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  let date = new Date(val);
  //@ts-ignore
  let formatter = new Intl.DateTimeFormat("en-IN", options);
  return formatter.format(date);
};

export const getAge = ({ date }) => {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

export const convertIntoCurrency = ({ amount }) => {
  let formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "INR",
  });
  return formatter.format(Number(amount));
};
