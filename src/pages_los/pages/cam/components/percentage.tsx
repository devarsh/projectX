export const Percentage = ({ value }: any) => {
  if (value !== "" && value !== undefined) {
    return `${value}%`;
  }
  return null;
};
