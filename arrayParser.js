const fs = require('fs')
const valueParser = require('./valueParser')

const data = fs.readFileSync(
  'D:\\Geekskool\\JSONParser\\inputString.txt',
  'utf8'
)

function arrayParser (data) {
  const ans = []
  if (!data.startsWith('[')) return null
  data = data.slice(1)
  data = data.trim()
  while (data.length !== 0 && data[0] !== ']') {
    const valueParserValue = valueParser(data)
    if (!valueParserValue) return null
    else {
      ans.push(valueParserValue[0])
      data = valueParserValue[1]
      data = data.trim()
      if (data[0] === ',') {
        data = data.slice(1)
        data = data.trim()
        if (data[0] === ']') return null
      }
    }
  }

  return [ans, data.slice(1)]
}

console.log(arrayParser(data))
