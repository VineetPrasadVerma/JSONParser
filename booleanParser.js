// Boolean Parser
function booleanParser (input) {
  return input.startsWith('true')
    ? [true, input.slice(4)]
    : input.startsWith('false')
    ? [false, input.slice(5)]
    : null
}

// console.log(booleanParser('trueCorrect'))

module.exports = booleanParser
