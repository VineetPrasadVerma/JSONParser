function nullParser(input) {
  if (input.startsWith('null')) {
    return [null, input.slice(4)]
  }
  return null
}

console.log(nullParser('nullabcd'))
console.log(nullParser('abcdnull'))
console.log(nullParser('{"null":"John", "age":31, "city":"New York"}'))
