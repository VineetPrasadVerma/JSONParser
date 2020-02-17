const nullParser = require('./nullParser')
const booleanParser = require('./booleanParser')
const numberParser = require('./numberParser')
const stringParser = require('./stringParser')

function valueParser (data) {
  const nullParserValue = nullParser(data)
  if (!nullParserValue) {
    const booleanParserValue = booleanParser(data)
    if (!booleanParserValue) {
      const numberParserValue = numberParser(data)
      if (!numberParserValue) {
        const stringParserValue = stringParser(data)
        if (!stringParserValue) {
          return null
        } else {
          return stringParserValue
        }
      } else {
        return numberParserValue
      }
    } else {
      return booleanParserValue
    }
  } else {
    return nullParserValue
  }
}

module.exports = valueParser
