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
// console.log(stringParser(data))
// const t = stringParser(data)[0].join('')
// console.log(t)
// console.log([t, 0])

module.exports = stringParser
