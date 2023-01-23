import { VTagColor } from '../components/base/tags/VTag.vue'

const colorValues: VTagColor[] = [
  'white',
  'light',
  'solid',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
  'orange',
  'blue',
  'green',
  'purple',
]

/**
 * Reduce the given string to the given length
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {string} str the given string
 * @param {number} length the given length
 * @returns {string}
 */
export const reduceString = (str: string, length: number): string => str.length > length + 4 ? `${str.substring(0, length)} ...` : str

/**
 * function to return a random color prop
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @returns {VTagColor}
 */
export const getRandomColorProp = (): VTagColor =>
  colorValues[getRandomNumber(0, colorValues.length - 1)]

/**
 * function to check if we are in the Dark-node
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @returns {boolean}
 */
export const isDarkMode = () =>
  // eslint-disable-next-line no-undef
  globalThis?.matchMedia?.('prefers-color-scheme:dark').matches ?? false

/**
 * function to copy content to clipboard
 * @param {string} text the text to copy
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 */
export const copyToClipboard = (text: string) =>
  navigator?.clipboard?.writeText(text) ?? false

/**
 * remove duplicates element in an array
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {Array} array the array to clean
 * @returns {Array}
 */
export const uniqueArray = (array: any[]): any[] => [...new Set(array)]

/**
 * function that check if an element is the first element of an array
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {Array} arr the array
 * @param {any} item the item
 * @returns {boolean}
 */
export const isFirst = (arr: any[], item: any) =>
  arr.findIndex((elt) => elt === item) === 0

/**
 * function that check if an element is the last element of an array
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {Array} arr the array
 * @param {any} item the item
 * @returns {boolean}
 */
export const isLast = (arr: any[], item: any) =>
  arr.findIndex((elt) => elt === item) === arr.length - 1

/**
 * function that delete an element of an array
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {Array} arr the array
 * @param {any} item the item
 * @returns {Array}
 */
export const deleteArrayElt = (arr: any[], item: any): any[] =>
  assignObject(arr.filter((a) => a !== item))

/**
 * function that push an element inside an array
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {Array} arr the array
 * @param {any} item the item
 * @returns {Array}
 */
export const pushArrayElt = (arr: any[], item: any): any[] => assignObject(arr).push(item)

/**
 * function that shuffle a provided array
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {Array} array the array to shuffle
 * @returns {Array}
 */
export const shuffleArray = (array: any[]): any[] => array.sort(() => Math.random() - 0.5)

/**
 * function to assign an object to another one properly
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {object} obj the object to copy
 * @returns {object}
 */
export const assignObject = (obj: any) => JSON.parse(JSON.stringify(obj))

/**
 * Retrieve a random number between two numbers
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {number} min the min number value
 * @param {number} max the max number value
 * @returns {number}
 */
export const getRandomNumber = (min: number, max: number): number =>
  ~~(Math.random() * (max - min + 1)) + min

/**
 * Generate random Hex color (#ff0000)
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @returns {string} Hex color
 */
export const getRandomHexColor = (): string =>
  `#${((Math.random() * 0xffffff) << 0).toString(16)}`

/**
 * Loop a callback x times
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {number} x the loop iteration number
 * @param fn the call back to loop
 */
export const loopCallback = (x: number, fn: any) => [...Array(x)].forEach(fn)

/**
 * Get random element in an array
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {Array} array the provided array
 * @returns {any} element
 */
export const getRandomElement = (array: any[]) => array[~~(Math.random() * array.length)]

/**
 * Generate a random string with the provided length
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {number} length the length of the string
 * @returns {string}
 */
export const getRandomString = (length: number): string =>
  [...Array(length)].map(() => String.fromCharCode(~~(Math.random() * 26) + 97)).join('')

/**
 * Get the duration beetween two dates in seconds
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {string} start the start string date
 * @param {string} end the end string date
 * @returns {number}
 */
export const secondsToRealTimeEvent = (start: string, end: string): number =>
  (Date.parse(end) - Date.parse(start)) / 1000

/**
 * Get the human readable seconds
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {number} time the string time in seconds
 * @param {boolean} is_ms We have milliseconds instead of seconds
 * @returns {string}
 */
export const secondsToRealTime = (time: number, is_ms?: boolean): string => {
  if (time <= 0) return '0s'

  const _time = is_ms ? (time / 1000) : time
  let ret = ''
  let _m = Math.floor(_time / 60)

  const _s = Math.ceil(_time % 60)
  const _h = Math.floor(_m / 60)

  _m %= 60

  ret += _h > 0 ? `${_h}h ` : ''
  ret += _m > 0 ? `${_m}m ` : ''
  ret += _s > 0 ? `${_s}s` : ''

  return ret
}

/**
 * Get a random boolean
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @returns {boolean} true or false
 */
export const getRandomBoolean = (): boolean => Math.random() >= 0.5

/**
 * Get all url query parameters
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param url the browser url
 * @returns {object} of different query params
 */
export const getQueryParams = (url: string) => new URLSearchParams(url.split('?')[1])

/**
 * Transform large number to a string
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param x the number to convert
 * @returns {string}
 */
export const numToWord = (x: number): string =>
  x.toLocaleString('en-US', { notation: 'compact' })

/**
 * Retrieve any selected text in the window
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @returns {string} the selected string
 */
export const getSelected = () => window.getSelection()?.toString()

/**
 * Convert a RGB color to his HEX equivalent
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {number} r the red color intensity
 * @param {number} g the green color intensity
 * @param {number} b the blue color intensity
 * @returns {string}
 */
export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`

/**
 * Check if the provide email is well formatted
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {string} email the provided email
 * @returns {boolean} the validation status
 */
export const isEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
