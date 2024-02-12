export const mix = (color_1: string, color_2: string, weight: number) => {
  function d2h(d: number) {
    return d.toString(16);
  } // convert a decimal value to hex
  function h2d(h: string) {
    return parseInt(h, 16);
  } // convert a hex value to decimal

  const w = typeof weight !== 'undefined' ? weight : 50; // set the weight to 50%, if that argument is omitted

  let color = '#';
  const color1 = color_1.substring(1);

  for (let i = 0; i <= 5; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue
    const v1 = h2d(color1.substring(i, i + 2)); // extract the current pairs
    const v2 = h2d(color_2.substring(i, i + 2));

    // combine the current pairs from each source color, according to the specified weight
    let val = d2h(Math.floor(v2 + (v1 - v2) * (w / 100.0)));

    while (val.length < 2) {
      val = `0${val}`;
    } // prepend a '0' if val results in a single digit

    color += val; // concatenate val to our new color string
  }
  return color; // PROFIT!
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : '';
};

export const hexToRgbValues = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '';
};
