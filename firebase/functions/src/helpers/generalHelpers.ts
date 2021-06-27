export const createFormatedDate = () => {
  // creates string in format DD-MM-YYYY
  const time = new Date();
  return `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
};

