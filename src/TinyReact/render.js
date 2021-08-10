import diff from './diff'
export default function render (virtualDOM, container, oldDOM = container.firstChild) {
  console.log('------', virtualDOM, oldDOM && oldDOM._virtualDOM)
  diff(virtualDOM, container, oldDOM)
}