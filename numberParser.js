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
