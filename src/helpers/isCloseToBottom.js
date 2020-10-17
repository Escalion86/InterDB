const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 0 // Distance from the bottom you want it to trigger.
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  )
}

export default isCloseToBottom
