export default function isFunction (virtualDOM) {
  return virtualDOM.type && typeof virtualDOM.type === 'function'
}