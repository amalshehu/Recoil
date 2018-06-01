import { correlateVDOMNode, createNodeRecursive } from './vDOM.mjs'
export const injectPatch = (patch, domRoot) => {
  switch (patch.type) {
    case 'create':
      {
        const domNode = correlateVDOMNode(patch.parent, domRoot)
        createNodeRecursive(patch.node, domNode)
      }
      break

    case 'remove':
      {
        const domNode = correlateVDOMNode(patch.node, domRoot)
        domNode.parentNode.removeChild(domNode)
      }
      break

    case 'replace': {
      const domNode = correlateVDOMNode(patch.replacingNode, domRoot)
      const parentDomNode = domNode.parentNode
      parentDomNode.removeChild(domNode)

      // Recursively create the new node
      createNodeRecursive(patch.node, parentDomNode)
    }
    case 'replace_attr':
      {
        if (patch.replacingNode.type === 'text') {
          const domNode = correlateVDOMNode(patch.replacingNode, domRoot)
          const textChildNode = [...domNode.childNodes].find(
            child =>
              child.nodeValue === patch.replacingNode.attributes.text.toString()
          )
          textChildNode.nodeValue = patch.node.attributes.text.toString()
        } else {
          const domNode = correlateVDOMNode(patch.replacingNode, domRoot)
        }
      }
      break
    default:
      throw new Error(`Missing implementation for patch ${patch.type}`)
  }
}
