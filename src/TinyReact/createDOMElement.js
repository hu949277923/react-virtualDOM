import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
export default function createDOMElement (virtualDOM) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 创建文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 创建元素节点
    newElement = document.createElement(virtualDOM.type)
    // 为元素添加属性
    updateNodeElement(newElement, virtualDOM)
  }
  newElement._virtualDOM = virtualDOM
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement)
  });
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }
  console.log(newElement)
  return newElement
}