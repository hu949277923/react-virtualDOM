import mountNativeElement from "./mountNativeElement";
import mountComponent from './mountComponent'
import isFunction from './isFunction'
export default function mountElement (virtualDOM, container, oldDOM) {
  // 是component DOM OR native DOM 
  // 是component 则 type 类型为function 所以判断类型为函数那就是组件
  if (isFunction(virtualDOM)) {

    // 函数组件
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    // native element
    mountNativeElement(virtualDOM, container, oldDOM)
  }
  
}