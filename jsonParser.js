// Null Parser
function nullParser (input) {
  if (input.startsWith('null')) return [null, input.slice(4)]
  return null
}

console.log(nullParser('nullabcd'))
// console.log(nullParser('abcdnull'))
// console.log(nullParser('{"null":"John", "age":31, "city":"New York"}'))

// Boolean Parser
function booleanParser (input) {
  return input.startsWith('true')
    ? [true, input.slice(4)]
    : input.startsWith('false')
    ? [false, input.slice(5)]
    : null
}

console.log(booleanParser('trueCorrect'))
// console.log(booleanParser('falseWrong'))
// console.log(booleanParser('CorrectTrue'))

// Number Parser Test Cases
const arr = [
  '012',
  '-0',
  '0',
  '-01',
  '-',
  '--',
  '00',
  '-00',
  '+21',
  ' ',
  '1221',
  '-1---1',
  '1001',
  '-1001',
  '-231',
  '123ABC',
  '123,456',
  '-213abc,',
  '-0ABD',
  '-ABC123',
  'ABC12',
  '1.33E+4r66r+++r',
  '-1.3333e+9uu',
  '--1.3333e+9uu',
  '+1.3333e+9uu',
  '0',
  '0.0',
  '-0',
  '012',
  '-012',
  '00',
  '0e45',
  '0e45',
  '0ab',
  '.err',
  '-0.1e10',
  '.12',
  '0.12',
  'e12',
  '.e12',
  'e+12',
  '.e+12',
  '1.e12',
  '0 ',
  '1e12',
  '0.e',
  '1.3abc'
]

// Number Parser
function numberParser (str) {
  // if (/^[-]?0[\d]+/.test(str)) {
  //   return null
  // }
  // // if (/^[-]?0[\w]+/.test(str)) {
  // //   const matchLength = str.match(/^[-]?0[\w]/)[0].length
  // //   return [str.slice(0, matchLength), str.slice(matchLength)]
  // // }
  // // if (/^[-]?0$|^[-]?[1-9][0-9]*/.test(str)) {
  // //   const matchLength = str.match(/^[-]?0$|^[-]?[1-9][0-9]*/)[0].length
  // //   return [str.slice(0, matchLength), str.slice(matchLength)]
  // // }

  // if (/^[-]?0[\d]+/.test(str)) {
  //   return null
  // }
  // // if (/^[-]?0[\w]+/.test(str)) {
  // //   const matchLength = str.match(/^[-]?0[\w]/)[0].length
  // //   return [str.slice(0, matchLength), str.slice(matchLength)]
  // // }
  // // if (/^[-]?0$|^[-]?[1-9][0-9]*/.test(str)) {
  // //   const matchLength = str.match(/^[-]?0$|^[-]?[1-9][0-9]*/)[0].length
  // //   return [str.slice(0, matchLength), str.slice(matchLength)]
  // // }

  // if (/^[-]?0\d+/.test(str)) {
  //   return null
  // }
  // if (
  //   /^[-]?((0(\.\d+)?(e[+-]?\d+)?)|([1-9]\d*(\.\d+)?)(e[+-]?\d+)?)/i.test(str)
  // ) {
  //   const matchLength = str.match(
  //     /^[-]?((0(\.\d+)?(e[+-]?\d+)?)|([1-9]\d*(\.\d+)?)(e[+-]?\d+)?)/i
  //   )[0].length
  //   return [str.slice(0, matchLength), str.slice(matchLength)]
  // }
  // return null

  // if (/^[-]?(0|[1-9]\d*)(\.\d+)?(e[+-]?\d+)?/i.test(str)) {
  //   const matchLength = str.match(/^[-]?(0|[1-9]\d*)(\.\d+)?(e[+-]?\d+)?/i)[0]
  //     .length
  //   return [str.slice(0, matchLength), str.slice(matchLength)]
  // }

  if (/^[-]?0\d+/.test(str)) {
    return null
  }
  const matchLength = str.match(/^[-]?(0|[1-9]\d*)(\.\d+)?(e[+-]?\d+)?/i)
  if (!matchLength) return null
  return [matchLength[0], str.slice(matchLength[0].length)]
}

for (const ele of arr) {
  console.log(ele + ' -->', numberParser(ele))
}

// String Parser

const fs = require('fs')
const data = fs.readFileSync(
  'D:\\Geekskool\\JSONParser\\inputString.txt',
  'utf8'
)

function stringParser (data) {
  const ans = []
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

  // console.log(specialCharacter)

  // console.log(data)
  if (!data.startsWith('"')) return null
  data = data.slice(1)
  while (data.length !== 0 && data[0] !== '"') {
    if (data[0] === '\\') {
      if (specialCharacter[data[1]]) {
        ans.push(specialCharacter[data[1]])
        data = data.slice(2)
        if (data.includes('"')) continue
        return null
      }
      if (data[1] === 'u') {
        const hexDigits = data.slice(2, 6)
        if (hexDigits.match(/[a-fA-F0-9]{4}/)) {
          const actualCharacter = String.fromCodePoint(parseInt(hexDigits, 16))
          if (actualCharacter) {
            data = data.slice(6)
            ans.push(actualCharacter)
          } else {
            return null
          }
        } else {
          return null
        }
      } else {
        return null
      }
    }

    ans.push(data[0])
    data = data.slice(1)

    // return [ans.join(''), data]
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i] === '\\') {
    //     // console.log(data[i + 1])
    //     const temp = specialCharacter[data[i + 1]]
    //     if (temp) {
    //       ans.push(temp)
    //       i += 1
    //     } else {
    //       return null
    //     }
    //   } else {
    //     ans.push(data[i])
    //   }
    // }
  }
  return [ans.join(''), data.slice(1)]
}
console.log(stringParser(data))
// const t = stringParser(data)[0].join('')
// console.log(t)
// console.log([t, 0])
