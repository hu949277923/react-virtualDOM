import mountElement from "./mountElement"
import updateComponent from './updateComponent'
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
  //判断是否是同一个组件
  if (isSameComponent(virtualDOM, oldComponent)) {
    console.log('同一个组件')
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    console.log('不同组件')
    mountElement(virtualDOM, container, oldDOM)
  }
}
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}