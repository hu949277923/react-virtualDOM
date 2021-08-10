import mountElement from "./mountElement";
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from "./createDOMElement";
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'
export default function diff (virtualDOM, container, oldDOM) {
  // 获取旧的oldVirtualDOM
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  console.log('--diff---',virtualDOM,oldVirtualDOM)
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component 
  console.log('--oldComponent---',virtualDOM,oldComponent)
 // 判断oldDOM不存在
 if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') { //不是同一个节点
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) { // 是同一个节点
    if (virtualDOM.type === 'text') {
      console.log('virtualDOM', virtualDOM, oldVirtualDOM)
      // 文本节点
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 元素节点
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }
    
    
    // 1 遍历旧的子节点，获取key,将其存储到json对象中
    let keyedElements = {}
    // 2 遍历oldDOM子节点，获取json对象中与之对应的key的值
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      const domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) { // 1 为元素节点
        let key = domElement.getAttribute('key')
        console.log('domElement', domElement)
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }
    let hasNoKey = Object.keys(keyedElements).length === 0
    if (hasNoKey) {
      [...virtualDOM.children].forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      })
    } else {
      // 3 遍历新的virtualDOM子节点
      virtualDOM.children.forEach((child, index) => {
        const key = child.props.key
        if (key) {
          const domElement = keyedElements[key]
          console.log('遍历新的virtualDOM子节点',key, index, domElement,  oldDOM.childNodes )
          if (domElement) {
            if (oldDOM.childNodes[index] && oldDOM.childNodes[index] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[index])
            }
          } else {
            mountElement(child, oldDOM,  oldDOM.childNodes[index])
          }
        }
      })
    }
    // 3 如果存在，则判断位置是否变化，如果位置变化，则将新的插入旧的之前
    // 如果新节点少于旧节点，则需要删除旧节点
    console.log('oldDOM.childNodes.length', oldDOM.childNodes.length, virtualDOM.children.length)
    if (oldDOM.childNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        for (let i = oldDOM.childNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldDOM.childNodes[i])
        }
      } else {
        for (let i = 0; i < oldDOM.childNodes.length; i++) {
          const oldChild = oldDOM.childNodes[i]
          const oldChildKey = oldChild._virtualDOM.props.key
          if (oldChildKey) {
            let found = false
            for (let n = 0; n < virtualDOM.children.length; n++) {
              if (oldChildKey === virtualDOM.children[n].props.key) {
                found = true
                break
              }
            }
            if (!found) {
              unmountNode(oldChild)
            }
          }
        }
      }
    }
  } else if (typeof virtualDOM.type === 'function') { // 如果是组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  }
}