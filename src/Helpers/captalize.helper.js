const capitalize = (string) => {
  const rawArray = string.split(" ");
  const captalizedArray = rawArray.map((item) => {
    const firstLetters = item[0].toUpperCase();
    const otherLetters = item.slice(1, item.length).toLowerCase();
    return firstLetters + otherLetters;
  });
  return captalizedArray;
};

export default capitalize;
