// Attribute values can contain '>'. Keep quoted strings intact when selecting tags.
export const svgOpeningTag = /<svg\b(?:[^>"']|"[^"]*"|'[^']*')*>/;
export const xmlTagParts = /(<(?:[^>"']|"[^"]*"|'[^']*')*>)/g;
