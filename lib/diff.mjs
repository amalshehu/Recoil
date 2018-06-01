import diffNow from './diff.mjs'

export default (left, right, patches, parent = null) => {
  if (!left) {
    patches.push({
      parent,
      type: 'CREATE_DOM_NODE',
      node: right
    })
  } else if (!right) {
    patches.push({
      type: 'REMOVE_DOM_NODE',
      node: left
    })
  } else if (left.type !== right.type) {
    patches.push({
      type: 'REPLACE_DOM_NODE',
      replacingNode: left,
      node: right
    })
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
