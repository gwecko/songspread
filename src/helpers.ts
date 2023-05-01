export function formatDuration(duration: number) {
  const ms = new Date(duration);
  const seconds = ms.getSeconds();
  return seconds < 10
    ? `${ms.getMinutes()}:0${seconds}`
    : `${ms.getMinutes()}:${seconds}`;
}


export function formatArtist(artists: any[]) {
  return artists.map((artist) => artist.name).join(", ");
}

