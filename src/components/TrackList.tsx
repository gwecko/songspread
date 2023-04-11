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
  const {timeRange} = Props
  const [songLimit, setSongLimit] = useState(5);

  const url =
    "https://api.spotify.com/v1/me/top/tracks?" +
    queryString.stringify({
      time_range: timeRange,
      limit: songLimit,
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

  const { name, email, picture } = Props.session.token;
  
  const List: React.FC = () => {
    return (
      <UnorderedList spacing={"10px"} styleType={"none"}>
        {tracks?.map((track, i) => {
          const songDuration = formatDuration(track.duration_ms),
          songName = track.name,
          artistName = track.album.artists[0].name,
          albumName = track.album.name;
          return (
            <ListItem key={i}>
              {songName} ({songDuration}) - {artistName} | album: {albumName}
            </ListItem>
          );
        })}
      </UnorderedList>
    );
  };

  return !tracks ? (
    <Spinner color="purple.400" size="xl" thickness=".6em" />
  ) : (
    <Stack align={"center"} wrap={"wrap"} maxW={"600px"} w={"80%"}>
        <List />
    </Stack>
  );
};

export default TrackList;
