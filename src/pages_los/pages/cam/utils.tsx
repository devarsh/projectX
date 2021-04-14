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

export const getAge = ({ date }) => {
  try {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    return age;
  } catch (e) {
    return "-9999";
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
