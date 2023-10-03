// Função para converter cor hexadecimal em valores de canal RGB
const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
};

// Função para gerar a tag CSS filter com base na cor hexadecimal
export const generateFilterTag = (hexColor: string) => {
  const rgbColor = hexToRgb(hexColor);

  const invertValue = rgbColor.r;
  const sepiaValue = rgbColor.g;
  const saturateValue = rgbColor.b * 20;
  const hueRotateValue = rgbColor.r * 3;
  const brightnessValue = 100 - rgbColor.g;
  const contrastValue = 100 - rgbColor.b;

  const filterTag = `invert(${invertValue}%) sepia(${sepiaValue}%) saturate(${saturateValue}%) hue-rotate(${hueRotateValue}deg) brightness(${brightnessValue}%) contrast(${contrastValue}%)`;

  return filterTag;
};

export default {
  generateFilterTag,
};
