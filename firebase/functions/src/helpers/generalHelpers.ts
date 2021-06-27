export const createFormatedDate = () => {
  // creates string in format DD-MM-YYYY
  const time = new Date();
  return `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
};

export const removeInternalStopSymbols = (text: string) => {
  // IBM api doesn't work as expected if input has following symbols inside, so we this removes them
  const stopCharacters = ["!", "?", ".", ";"];
  const arrOfChars = text.split("");
  for (let i = 0; i < arrOfChars.length - 1; i++) {
    if (stopCharacters.indexOf(text[i]) !== -1) {
      arrOfChars[i] = " ";
    }
  }
  console.log(arrOfChars, "S", arrOfChars[arrOfChars.length - 1]);
  if (stopCharacters.indexOf(arrOfChars[arrOfChars.length - 1]) === -1) {
    arrOfChars.push(".");
  }

  return arrOfChars.join("");
};
console.log(removeInternalStopSymbols("AAA. AA C "));
