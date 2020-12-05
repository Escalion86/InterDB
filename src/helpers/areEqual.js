const areEqual = (prevProps, nextProps) => {
  if (prevProps.data === null && nextProps.data !== null) return false
  if (nextProps.data === null && nextProps.data === null) return true
  if (prevProps.data.length !== nextProps.data.length) return false
  for (let i = 0; i < prevProps.data.length; i++) {
    if (
      prevProps.data[i].id !== nextProps.data[i].id ||
      prevProps.data[i].update_date !== nextProps.data[i].update_date
    ) {
      return false
    }
  }
  return true
}

export default areEqual
