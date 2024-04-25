import json from './data.json';

export type ConvertedColor = keyof typeof json;

export function convert(color: ConvertedColor) {
  return json[color];
}
