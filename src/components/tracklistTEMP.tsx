import React, { RefObject, useEffect, useState } from "react";
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
} from "@chakra-ui/react";

interface Props {
  numTracks: number;
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

interface Tracks extends Array<Track> {}

const TrackList: React.FC<Props> = (Props) => {
  const [tracks, setTracks] = useState<Tracks>();
  const { timeRange, numTracks } = Props;

  const url =
    "https://api.spotify.com/v1/me/top/tracks?" +
    queryString.stringify({
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const List: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <UnorderedList
          spacing={".5em"}
          styleType={"none"}
          fontSize={["sm", "md"]}
        >
          {tracks?.map((track, i) => {
            while (i < numTracks) {
              const songDuration = formatDuration(track.duration_ms),
                artistNames = formatArtist(track.artists),
                songName = track.name,
                songLink = track.external_urls.spotify,
                albumName = track.album.name;
              return (
                <ListItem key={i} w={"80%"} margin={"auto"}>
                    <Link
                      href={songLink}
                      _hover={{ textDecoration: "none" }}
                      isExternal
                    >
                      {i + 1}. {songName} - {artistNames}
                    </Link>
                </ListItem>
              );
            }
          })}
        </UnorderedList>
    );
  };

  return (
    <Stack align={"center"} wrap={"wrap"}>
      {!tracks ? (
        <Spinner color="purple.400" size="xl" thickness=".6em" />
      ) : (
        <List />
      )}
    </Stack>
  );
};

export default TrackList;
