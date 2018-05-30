export const diff = (left, right, patches, parent = null) => {
  // If the left side (i.e. current vDOM) node does not exist, we have to create it.
  // In this case we don't have to keep recursing since the creation process
  // itself is recursive
  if (!left) {
    patches.push({
      parent, // We pass in the parent of the left side node
      // so we know whether to attach the newly create descendants
      type: PatchTypes.PATCH_CREATE_NODE,
      node: right // And of course we pass in the newly created node
    })
  } else if (!right) {
    // If the right side (i.e. the new vDOM) node doesn't exist,
    // we need to remove the node from the vDOM
    patches.push({
      type: PatchTypes.PATCH_REMOVE_NODE,
      node: left // We just need to pass in the node to remove
    })
  } else if (left.type !== right.type) {
    // Here the type is changing and so we assume that the subtree
    // has changed and halt the recursion, greatly speeding up
    // the algorithm
    patches.push({
      type: PatchTypes.PATCH_REPLACE_NODE,
      replacingNode: left,
      node: right
    })
  } else if (right.memoized) {
    // Here we have another excellent and very effective optimization.
    // If we know that we are dealing with a memoized node, we
    // don't need to bother traversing the rest of the subtree since we
    // can be sure that its vDOM has not changed
    return
  } else {
    // Now we iterate over all descendants of the left of right side
    // and call ourself recursively
    const children =
      left.children.length >= right.children.length
        ? left.children
        : right.children

    children.forEach((child, index) =>
      diff(left.children[index], right.children[index], patches, left)
    )
  }
}
