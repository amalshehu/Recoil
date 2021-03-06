import diffNow from './diff.mjs'
import { createVdom } from './vDOM.mjs'
import { runPatcher } from './patcher.mjs'

export const esx = (type, props = {}, children = []) => ({
  type,
  props,
  children
})

export const makeRender = domElement => {
  let lastVDOM = null
  let patches = null
  return element => {
    const vdom = createVdom(element)
    patches = []
    diffNow(lastVDOM, vdom, patches)
    patches.forEach(patch => runPatcher(patch, domElement))
    lastVDOM = vdom
  }
}
