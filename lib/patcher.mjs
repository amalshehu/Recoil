import { findDomNodeToPatch, createNodeRecursive } from './vDOM.mjs'

export const runPatcher = (patch, domRoot) => {
  switch (patch.type) {
    case 'CREATE_DOM_NODE':
      {
        const domNode = findDomNodeToPatch(patch.parent, domRoot)
        createNodeRecursive(patch.node, domNode)
      }
      break

    case 'REMOVE_DOM_NODE':
      {
        const domNode = findDomNodeToPatch(patch.node, domRoot)
        domNode.parentNode.removeChild(domNode)
      }
      break

    case 'REPLACE_DOM_NODE':
      {
        const domNode = findDomNodeToPatch(patch.replacingNode, domRoot)
        const parentDomNode = domNode.parentNode
        parentDomNode.removeChild(domNode)

        // Recursively createS the new node
        createNodeRecursive(patch.node, parentDomNode)
      }
      break
    default:
      throw new Error(`Missing implementation for patch ${patch.type}`)
  }
}
