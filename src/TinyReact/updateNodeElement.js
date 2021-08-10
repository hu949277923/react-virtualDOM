export default function updateNodeElement (
  newElement, 
  virtualDOM = {}, 
  oldVirtualDOM = {}
) {
  // 获取props对象
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}
  Object.keys(newProps).forEach(propName => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    // 新值属性与旧值属性不一致，则触发更新
    if (newPropValue !== oldPropValue) {
      // 处理事件逻辑
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLocaleLowerCase().slice(2)
        newElement.addEventListener(eventName, newPropValue)
        // 如果旧属性有绑定事件，则需要取消绑定
        if (oldPropValue) {
          newElement.removeEventListener(eventName, oldPropValue)
        }
      } else if (propName === 'value' || propName === 'checked') {  // 处理value/checked属性
        newElement[propName] = newPropValue
      } else if (propName !== 'children') {  // 处理children
        if (propName === 'className') {  // 处理classname属性
          newElement.setAttribute('class', newPropValue)
        } else { // 处理普通属性
          newElement.setAttribute(propName, newPropValue)
        }
      }
    }
  })
  // 如果旧属性中没有新属性，则删除
  Object.keys(oldProps).forEach(propName => {
    const oldPropValue = oldProps[propName]
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.slice(2)
      if (!newProps[eventName]) {
        newElement.removeEventListener(eventName, oldPropValue)
      }
    } else if (propName !== 'children') {
      if (!newProps[propName]) {
        newElement.removeAttribute(propName)
      }
    }
  })
}