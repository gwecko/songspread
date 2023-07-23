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

// Purple 50
// #FAF5FF
// Purple 100
// #E9D8FD
// Purple 200
// #D6BCFA
// Purple 300
// #B794F4
// Purple 400
// #9F7AEA
// Purple 500
// #805AD5
// Purple 600
// #6B46C1
// Purple 700
// #553C9A
// Purple 800
// #44337A
// Purple 900
// #322659

