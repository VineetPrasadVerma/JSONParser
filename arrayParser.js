const fs = require('fs')
const valueParser = require('./valueParser')
const objectParser = require('./objectParser')

const data = fs.readFileSync(
  'D:\\Geekskool\\JSONParser\\inputString.txt',
  'utf8'
)

function arrayParser (data) {
  const ans = []
  if (!data.startsWith('[')) return null
  data = data.slice(1).trim()
  while (data.length !== 0 && data[0] !== ']') {
    data = data.trim()
    const valueParserValue =
      valueParser(data) || arrayParser(data) || objectParser(data)
    if (!valueParserValue) return null
    ans.push(valueParserValue[0])
    data = valueParserValue[1].trim()
    if (data[0] !== ',') break
    data = data.slice(1).trim()
    if (data[0] === ']') return null
  }
  return data[0] === ']' ? [ans, data.slice(1)] : null
}

console.log(arrayParser(data))

module.exports = arrayParser
