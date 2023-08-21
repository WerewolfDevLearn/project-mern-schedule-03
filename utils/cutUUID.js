const cutUUID = code => {
  const codeArr = code.split('-');
  const max = codeArr.length;
  const min = 0;

  const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
  console.log('randomIndex: ', randomIndex);

  return codeArr[randomIndex];
};

module.exports = cutUUID;
