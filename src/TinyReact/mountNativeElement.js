import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
export default function mountNativeElement (virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)
  // 将转换之后的dom节点创建到页面中
  if (oldDOM) {
    console.log('container', container, oldDOM)
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }
  // 删除旧节点
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  
  const component = virtualDOM.component
  if (component) {
    component.setDOM(newElement)
  }
}