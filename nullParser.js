// Null Parser
function nullParser (input) {
  if (input.startsWith('null')) return [null, input.slice(4)]
  return null
}

// console.log(nullParser('nullabcd'))

module.exports = nullParser
