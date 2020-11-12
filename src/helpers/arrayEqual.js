const arrayEqual = (array1 = [], array2 = []) => {
  for (const key in array1) {
    if (array1[key] !== array2[key]) return false
  }
  return true
}

export default arrayEqual
