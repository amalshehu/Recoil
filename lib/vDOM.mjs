import diffNow from './diff.mjs'
export const esx = (type, props = {}, children = []) => ({
  type,
  props,
  children
})

const createVdom = (element, id = '_') => {
  const NODE = {
    ...element,
    id,
    children: element.children.map((child, index) =>
      createVdom(child, `${id}${index}.`)
    )
  }
  if (typeof element.type === 'function') {
    const subTree = NODE.type(element.props)
    return subTree.memoized ? subTree : createVdom(subTree, id)
  } else {
    return NODE
  }
}

const ID_KEY = 'recoil-id'

const correlateVDOMNode = (vdomNode, domRoot) => {
  if (vdomNode === null) {
    return domRoot
  } else {
    return document.querySelector(`[${ID_KEY}="${vdomNode.id}"]`)
  }
}

const createNodeRecursive = (vdomNode, domNode) => {
  if (vdomNode.type === 'text') {
    const textNode = document.createTextNode(vdomNode.props.text)
    domNode.appendChild(textNode)
  } else {
    const domElement = document.createElement(vdomNode.type)
    domElement.setAttribute(ID_KEY, vdomNode.id)
    domNode.appendChild(domElement)

    vdomNode.children.forEach(child => createNodeRecursive(child, domElement))
  }
}

const injectPatch = (patch, domRoot) => {
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

export const makeRender = domElement => {
  let lastVDOM = null
  let patches = null

  return element => {
    const vdom = createVdom(element)
    patches = []
    diffNow(lastVDOM, vdom, patches)
    patches.forEach(patch => injectPatch(patch, domElement))
    lastVDOM = vdom
  }
}
