export const Age = ({ value }: any) => {
  try {
    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();
    return age;
  } catch (e) {
    return "-9999";
  }
};
