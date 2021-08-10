
import isFunctionComponent from './isFunctionComponent'
import isFunction from './isFunction'
import mountNativeElement from './mountNativeElement'
export default function mountComponent (virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  let component = null
  if (isFunctionComponent(virtualDOM)) {
    // 是函数组件
    console.log('是函数组件')
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 是类组件
    console.log('是类组件')
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }
  if (component) {
    component.componentDidMount()
    console.log('---component---', component)
    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
  }
  
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}
function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component
  return nextVirtualDOM
}