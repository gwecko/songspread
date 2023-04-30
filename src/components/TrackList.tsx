import React, { RefObject, useEffect, useState } from "react";
import queryString from "query-string";
import { formatDuration } from "@/helpers";
import {
  List,
  ListItem,
  UnorderedList,
  Image,
  Skeleton,
  Box,
  Stack,
  Spinner,
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
  name: String;
  duration_ms: number;
  album: {
    artists: [
      {
        name: String;
      }
    ];
    name: String;
  };
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

  // const { name, email, picture } = Props.session.token;

  const List: React.FC = () => {
    return (
      <UnorderedList spacing={".5em"} styleType={"none"} fontSize={['xs', 'sm', 'md']}>
        {tracks?.map((track, i) => {
          while (i < numTracks) {
            const songDuration = formatDuration(track.duration_ms),
              songName = track.name,
              artistName = track.album.artists[0].name,
              albumName = track.album.name;
            return (
              <ListItem key={i}>
                {i + 1}. {songName} - {artistName}
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
