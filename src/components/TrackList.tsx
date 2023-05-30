import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { formatDuration, formatArtist } from "@/helpers";
import {
  List,
  ListItem,
  UnorderedList,
  Image,
  Skeleton,
  Box,
  Stack,
  Spinner,
  Link,
  Slide,
  useDisclosure,
  SlideFade,
  ScaleFade,
  Collapse,
  Fade,
} from "@chakra-ui/react";

interface Props {
  numTracksToDisplay: number;
  timeRange?: string;
  session: {
    token: {
      name?: string;
      email: string;
      picture?: string;
      accessToken?: string;
    };
  };
}

interface Track {
  name: string;
  artists: Object[];
  duration_ms: number;
  album: { name: string };
  external_urls: { spotify: string };
}

interface DisplayedTrack {
  songDuration: string,
  artistNames: string,
  songName: string,
  songLink: string,
  albumName: string,
  isDisplayed: boolean,
}

const TrackList: React.FC<Props> = (Props) => {
  const { timeRange, numTracksToDisplay } = Props;
  const [tracks, setTracks] = useState<Track[]>();
  const [isDisplayed, setIsDisplayed] = useState(Array<boolean>(15).fill(false))
  
  // get data from spotify on page load
  const url = "https://api.spotify.com/v1/me/top/tracks?" + queryString.stringify({
    time_range: timeRange,
    limit: 15,
  });
  const options = {
    headers: { Authorization: `Bearer ${Props.session?.token.accessToken}` },
  };
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setTracks(res.items);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // list of all fifteen songs. Array of object data
  const allTrackData = tracks?.map((track, i) => {
    return {
      songDuration: formatDuration(track.duration_ms),
      artistNames: formatArtist(track.artists),
      songName: track.name,
      songLink: track.external_urls.spotify,
      albumName: track.album.name,
      id: i,
      isDisplayed: i < numTracksToDisplay,
    }
  })
  

  const allTrackJSX = allTrackData?.map((trackData, i) => (
    <ListItem key={i} hidden={trackData.id > numTracksToDisplay - 1}>
      <Link
        href={trackData.songLink}
        _hover={{ textDecoration: "none" }}
        isExternal
      >
        {trackData.id + 1}. {trackData.songName} - {trackData.artistNames}
      </Link>
    </ListItem>
  ))

  return (
    <Stack align={"center"} wrap={"wrap"}>
      {!tracks ? (
        <Spinner color="purple.400" size="xl" thickness=".6em" />
      ) : (
        <UnorderedList
          spacing={".5em"}
          styleType={"none"}
          fontSize={["sm", "md"]}
          w={"80%"}
          margin={"auto"}
        >
          {allTrackJSX}
        </UnorderedList>
      )}
    </Stack>
  );
};

export default TrackList;



{/* <UnorderedList
          spacing={".5em"}
          styleType={"none"}
          fontSize={["sm", "md"]}
>
</UnorderedList> */}


{/* <ListItem key={i}>
          <Link
            href={songLink}
            _hover={{ textDecoration: "none" }}
            isExternal
          >
            {i + 1}. {songName} - {artistNames}
          </Link>
        </ListItem> */}