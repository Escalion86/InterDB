const wordForm = function (num, wordsArr, showNumber = true) {
  const cases = [2, 0, 1, 1, 1, 2]
  return `${showNumber ? num + ' ' : ''}${
    wordsArr[
      num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
    ]
  }`
}

export default wordForm
