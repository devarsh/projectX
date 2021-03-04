export const printTDS = ({ obj, key }) => {
  return [
    <td colSpan={2}>{obj[0]?.[key]}</td>,
    <td colSpan={2}>{obj[1]?.[key]}</td>,
    <td colSpan={2}>{obj[2]?.[key]}</td>,
  ];
};
