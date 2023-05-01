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


export function createBlobForDownload(base64ImageData: string) {
  const contentType = "image/png";
  const byteCharacters = atob(
    base64ImageData.substr(`data:${contentType};base64,`.length)
  );
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  const blobUrl = URL.createObjectURL(blob);

  return blobUrl;
}
