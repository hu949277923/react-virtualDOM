export default function updateTextNode (virtualDOM, oldVirtualDOM, oldDOM) {
  console.log('--updateTextNode---',virtualDOM.props.textContent, oldVirtualDOM.props.textContent)
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent
    oldDOM._virtualDOM = virtualDOM
  }
}