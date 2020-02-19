const fs = require('fs')
const valueParser = require('./valueParser')
const arrayParser = require('./arrayParser')
const stringParser = require('./stringParser')

const data = fs.readFileSync(
  'D:\\Geekskool\\JSONParser\\inputString.txt',
  'utf8'
)

function objectParser (data) {
  const ans = {}
  if (!data.startsWith('{')) return null
  data = data.slice(1)
  data = data.trim()
  while (data.length !== 0 && data[0] !== '}') {
    data = data.trim()
    const stringParserValue = stringParser(data)
    if (!stringParserValue) return null
    const keyData = stringParserValue[0]
    data = stringParserValue[1].trim()
    if (data[0] !== ':') return null
    data = data.slice(1).trim()
    const valueParserValue = valueParser(data)
    if (!valueParserValue) {
      const arrayParserValue = arrayParser(data) || objectParser(data)
      if (!arrayParserValue) return null
      ans[keyData] = arrayParserValue[0]
      data = arrayParserValue[1]
    } else {
      ans[keyData] = valueParserValue[0]
      data = valueParserValue[1]
    }
    data = data.trim()
    if (data[0] === ',') {
      data = data.slice(1).trim()
      if (data[0] === '}') return null
    } else {
      if (data[0] === '}') {
        return [ans, data.slice(1)]
      }
    }
  }

  if (data[0] === '}') return [ans, data.slice(1)]
  return null
}

console.log(objectParser(data))
module.exports = objectParser
