// Reading a file
const fs = require('fs')
for (let i = 1; i <= 3; i++) {
  const data = fs.readFileSync(`JSONParser\\test\\pass${i}.json`, 'utf8')
  console.log(i, JSONParser(data.trim()))
}

// Value Parser
function valueParser (data) {
  return (
    nullParser(data) ||
    booleanParser(data) ||
    numberParser(data) ||
    stringParser(data) ||
    arrayParser(data) ||
    objectParser(data) ||
    null
  )
}

// Null Parser
function nullParser (input) {
  if (input.startsWith('null')) return [null, input.slice(4)]
  return null
}

// Boolean Parser
function booleanParser (input) {
  if (input.startsWith('true')) return [true, input.slice(4)]
  if (input.startsWith('false')) return [false, input.slice(5)]
  return null
}

// Number Parser
function numberParser (str) {
  if (/^[-]?0\d+/.test(str)) {
    return null
  }
  const matchLength = str.match(/^[-]?(0|[1-9]\d*)(\.\d+)?(e[+-]?\d+)?/i)
  if (!matchLength) return null
  return [Number(matchLength[0]), str.slice(matchLength[0].length)]
}

// String Parser
function stringParser (data) {
  const result = []
  const specialCharacter = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
  }
  if (!data.startsWith('"')) return null
  data = data.slice(1)
  while (data[0] !== '"') {
    if (data[0] === '\n' || data[0] === '\t') return null
    if (data[0] === '\\') {
      if (specialCharacter[data[1]]) {
        result.push(specialCharacter[data[1]])
        data = data.slice(2)
        if (data.includes('"')) continue
        return null
      }
      if (data[1] !== 'u') return null
      const hexDigits = data.slice(2, 6)
      if (!hexDigits.match(/[a-fA-F0-9]{4}/)) return null
      const actualCharacter = String.fromCodePoint(parseInt(hexDigits, 16))
      if (!actualCharacter) return null
      data = data.slice(6)
      result.push(actualCharacter)
      continue
    }
    result.push(data[0])
    data = data.slice(1)
    if (data.length === 0) return null
  }
  return [result.join(''), data.slice(1)]
}

// Array Parser
function arrayParser (data) {
  if (!data.startsWith('[')) return null
  const result = []
  data = data.slice(1)
  while (data[0] !== ']') {
    data = data.trim()
    if (data[0] === ']') break
    const valueParserValue = valueParser(data)
    if (!valueParserValue) return null
    result.push(valueParserValue[0])
    data = valueParserValue[1].trim()
    if (!(data[0] === ',')) break
    data = data.slice(1).trim()
    if (data[0] === ']') return null
  }
  return data[0] === ']' ? [result, data.slice(1)] : null
}

// Object Parser
function objectParser (data) {
  const result = {}
  if (!data.startsWith('{')) return null
  data = data.slice(1).trim()
  while (data.length !== 0 && data[0] !== '}') {
    data = data.trim()

    const stringParserValue = stringParser(data)
    if (!stringParserValue) return null
    const keyData = stringParserValue[0]
    data = stringParserValue[1].trim()
    if (data[0] !== ':') return null
    data = data.slice(1).trim()

    const valueParserValue = valueParser(data)
    if (!valueParserValue) return null
    result[keyData] = valueParserValue[0]
    data = valueParserValue[1]
    data = data.trim()
    if (data[0] !== ',') break
    data = data.slice(1).trim()
    if (data[0] === '}') return null
  }
  return data[0] === '}' ? [result, data.slice(1)] : null
}

// JSON Parser
function JSONParser (input) {
  const jsonValue = arrayParser(input) || objectParser(input)
  if (jsonValue === null || jsonValue[1] !== '') return null
  return jsonValue[0]
}
