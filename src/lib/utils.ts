import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LUMINOSITY_RED = 0.299
const LUMINOSITY_GREEN = 0.587
const LUMINOSITY_BLUE = 0.114
const MAX_RGB_VALUE = 255
export function getLuminosity(hexcolor: string) {
  const matches = hexcolor.length === 3 ?
    hexcolor.match(/[0-F]/gi)?.map((hex) => hex + hex) // '#000'
    : hexcolor.match(/[0-F]{2}/gi) // '#0000000'
  if(!matches?.length) return 0
  const RGB = matches.map((hex) => parseInt(hex, 16))
  const RED = LUMINOSITY_RED * RGB[0]
  const GREEN = LUMINOSITY_GREEN * RGB[1]
  const BLUE = LUMINOSITY_BLUE * RGB[2]
  return (RED + GREEN + BLUE) / MAX_RGB_VALUE
}

export function getTextColorByLuminosity(luminosity: number) {
  return luminosity > 0.6 ? "#000" : "#FFF"
}

export function getTextColorByHexcolorLuminosity(hexcolor: string) {
  return getTextColorByLuminosity(getLuminosity(hexcolor))
}