type ArrayType = any[] | undefined
type CbType = (item: any, i: number, arr: ArrayType) => boolean

export const arrayEach = (array: ArrayType, callback: CbType) => {
  if (typeof array === 'undefined') {
    return
  }
  let index: number = -1
  const length: number = array.length
  while (++index < length) {
    const isBreak = callback(array[index], index, array)
    if (isBreak === false) {
      break
    }
  }
}
