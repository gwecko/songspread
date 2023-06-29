export function cl(thing: any) {
  console.log(thing)
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

