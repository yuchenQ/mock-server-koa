export default obj => Reflect.apply(Object.prototype.toString, obj, []).replace(/^\[object\s(\w+)\]$/, '$1');
