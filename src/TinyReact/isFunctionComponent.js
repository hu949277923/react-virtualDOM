import isFunction from "./isFunction";

export default function isFunctionComponent (virtualDOM) {
  const type = virtualDOM.type && isFunction(virtualDOM) && (!virtualDOM.type.prototype.render)
  return type
}