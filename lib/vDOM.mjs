export const createVdom = (element, id = '_') => {
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

export const correlateVDOMNode = (vdomNode, domRoot) => {
  if (vdomNode === null) {
    return domRoot
  } else {
    return document.querySelector(`[${ID_KEY}="${vdomNode.id}"]`)
  }
}

export const createNodeRecursive = (vdomNode, domNode) => {
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
