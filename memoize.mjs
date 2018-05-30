export const memoize = component => {
  // We need to record the previous props and return value of the component.
  // On the first call these are empty
  let lastProps = null
  let lastResult = null

  // We return a new component that uses the cached values for
  // optimization purposes
  return props => {
    // If the props have changed since the last function call,
    // we invoke the component with the new props and store the result
    if (!shallowEqual(props, lastProps)) {
      lastResult = component(props)
      lastProps = props

      // We also record whether the result came from the cache. We will
      // use this information later when we create the vDOM
      lastResult.memoized = true
    } else {
      lastResult.memoized = false
    }

    // Finally we return the cached value. This is referential transparency
    // at work (i.e. we can replace the component invocation with its value)
    return lastResult
  }
}
