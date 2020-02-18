const nullParser = require('./nullParser')
const booleanParser = require('./booleanParser')
const numberParser = require('./numberParser')
const stringParser = require('./stringParser')
// const arrayParser = require('./arrayParser')
// console.log(arrayParser)
//   const nullParserValue = nullParser(data)
//   if (!nullParserValue) {
//     const booleanParserValue = booleanParser(data)
//     if (!booleanParserValue) {
//       const numberParserValue = numberParser(data)
//       if (!numberParserValue) {
//         const stringParserValue = stringParser(data)
//         if (!stringParserValue) {
//           return null
//         } else {
//           return stringParserValue
//         }
//       } else {
//         return numberParserValue
//       }
//     } else {
//       return booleanParserValue
//     }
//   } else {
//     return nullParserValue
//   }
// }
const allParserArray = [nullParser, booleanParser, numberParser, stringParser]
function valueParser (data) {
  for (const currentParser of allParserArray) {
    const currentParserValue = currentParser(data)
    if (currentParserValue) return currentParserValue
  }

  return null
}
module.exports = valueParser
