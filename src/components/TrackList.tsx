import React, { RefObject, useEffect, useRef, useState } from "react";
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
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
  artists: Object[]
  duration_ms: number;
  album: { name: string; };
  external_urls: { spotify: string }
}

interface Tracks extends Array<Track> { }

const TrackList: React.FC<Props> = (Props) => {
  const [fetchedTracks, setFetchedTracks] = useState<Tracks>();
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
        setFetchedTracks(res.items);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const List = () => {
    const [displayedTracks, setDisplayedTracks] = useState<Tracks>()
    useEffect(() => {
      setDisplayedTracks(fetchedTracks?.slice(0, numTracks))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numTracks])
    
    return (
      <TransitionGroup>
          {displayedTracks?.map((track, index) => {
            return (
              <CSSTransition key={index}>
                <div>
                {track.name}
                </div>
              </CSSTransition>
            )
          })}
      </TransitionGroup>
    )
  };

  return (
    <Stack align={"center"} wrap={"wrap"}>
      {!fetchedTracks
        ? <Spinner color="purple.400" size="xl" thickness=".6em" />
        : <List />
      }
    </Stack>
  );
};

export default TrackList;
