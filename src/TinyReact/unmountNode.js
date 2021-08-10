export default function  unmountNode(node) {
  const virtualDOM = node._virtualDOM
  // 1 是文本节点直接删除
  if (virtualDOM.type === 'text') {
    node.remove()
    return
  }
  // 2 是否是由组件生成
  const component = virtualDOM.component
  if (component) {
    // 3 挂载卸载组件生命周期函数
    component.componentWillUnmount()
  }
  // 4 查看节点上是否由ref属性，有则清空
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }
  // 5  查看节点上是否有事件，有则移除
  Object.keys(virtualDOM.props).forEach(propName => {
    const eventValue = virtualDOM.props[propName]
    if (propName.slice(0, 2) === 'on') {
      node.removeEventListener(propName.toLowerCase().slice(2), eventValue)
    }
  })
  // 6 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }
  // 7 删除组件
  node.remove()
}