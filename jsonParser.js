function nullParser(input) {
  if (input.startsWith('null')) {
    return [null, input.slice(4)]
  }
  return null
}

console.log(nullParser('nullabcd'))
console.log(nullParser('abcdnull'))
// console.log(nullParser('{"null":"John", "age":31, "city":"New York"}'))

function booleanParser(input) {
  if (input.startsWith('true')) {
    return [true, input.slice(4)]
  }

  if (input.startsWith('false')) {
    return [false, input.slice(5)]
  }

  return null
}

console.log(booleanParser('trueCorrect'))
console.log(booleanParser('falseWrong'))
console.log(booleanParser('CorrectTrue'))
