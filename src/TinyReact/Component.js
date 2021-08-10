import diff from "./diff"

export default class Component {
  constructor (props) {
    this.props = props
  }
  setState (state) {
    // 重置this.state.
    this.state = Object.assign({}, this.state, state)
    console.log('newState', this.state)
    const virtualDOM = this.render()
    console.log('virtualDOM', virtualDOM)
    const oldDOM = this.getDOM()
    console.log('---oldDOM--', oldDOM)
    const container = oldDOM.parentNode
    diff(virtualDOM, container, oldDOM)
  }
  setDOM (dom) {
    this._dom = dom
  }
  getDOM () {
    return this._dom
  }
  updateProps (props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, preState) {}
  componentWillUnmount() {}
}