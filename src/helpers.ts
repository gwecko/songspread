export function cl(thing: any) {
  console.log(thing);
}

export function formatDuration(duration: number) {
  const ms = new Date(duration);
  const seconds = ms.getSeconds();
  return seconds < 10
    ? `${ms.getMinutes()}:0${seconds}`
    : `${ms.getMinutes()}:${seconds}`;
}

export function formatArtist(artists: any[]) {
  return artists.map((a) => a.name).join(", ");
}

export function boolVisibleStates(numVisible: number, arrLength: number) {
  return Array(numVisible)
    .fill(true)
    .concat(Array(arrLength - numVisible).fill(false));
}

export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
