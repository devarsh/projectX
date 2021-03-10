export const getAge = (date) => {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  return age;
};
