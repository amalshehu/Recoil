export default (left, right, patches, parent = null) => {
  if (!left) {
    patches.push({
      parent,
      type: 'create',
      node: right
    })
  } else if (!right) {
    patches.push({
      type: 'remove',
      node: left
    })
  } else if (left.type !== right.type) {
    patches.push({
      type: 'replace',
      replacingNode: left,
      node: right
    })
  } else if (right.memoized) {
    return
  } else {
    const children =
      left.children.length >= right.children.length
        ? left.children
        : right.children

    children.forEach((child, index) =>
      diffNow(left.children[index], right.children[index], patches, left)
    )
  }
}
