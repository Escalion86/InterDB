const trimingArrayValues = (array) => {
  const newArray = {}

  Object.keys(array).map(function (key, index) {
    if (typeof array[key] === 'string') {
      newArray[key] = array[key].trim()
    } else {
      newArray[key] = array[key]
    }
  })

  return newArray
}

export default trimingArrayValues
