import diff from "./diff"

export default function  updateComponent(virtualDOM, oldComponent, oldDOM, container) {
  console.log('---updateComponent---',virtualDOM, oldComponent)
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    /// 未更前前的props
    let prevProps = oldComponent.props
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 组件更新props
    oldComponent.updateProps(virtualDOM.props)
    // 获取组件返回的最新virtualDOM
    const nextVirtualDOM = oldComponent.render()
    // 更新Component实例对象,因为只是更新了prop属性，其他没有改变？？
    nextVirtualDOM.component = oldComponent
    // 比对
    diff(nextVirtualDOM, container, oldDOM)
    oldComponent.componentDidUpdate(prevProps)
  }
}