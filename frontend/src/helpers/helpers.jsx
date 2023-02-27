function toSnakeCase(value) {
  return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

function toCamelCase(value) {
  return value[0].toUpperCase() + value.substring(1)
}

export {toSnakeCase, toCamelCase}