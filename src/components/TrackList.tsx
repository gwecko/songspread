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

interface Tracks extends Array<Track> {}

const TrackList: React.FC<Props> = (Props) => {
  const { timeRange, numTracksToDisplay } = Props;
  const [tracks, setTracks] = useState<Tracks>();
  const [currentListLength, setCurrentListLength] = useState(numTracksToDisplay)

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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  const List: React.FC = () => {

    const listItems = tracks?.map((track, i) => {
      const songDuration = formatDuration(track.duration_ms),
        artistNames = formatArtist(track.artists),
        songName = track.name,
        songLink = track.external_urls.spotify,
        albumName = track.album.name;
      return (
        <Link key={i} href={songLink} _hover={{ textDecoration: "none" }} isExternal>
          {i + 1}. {songName} - {artistNames}
        </Link>
      );
    })

    const StaticList = () => {
      console.log("*** STATIC ***");
      console.log(`currentListLength: ${currentListLength}`);
      console.log(`numTracksToDisplay: ${numTracksToDisplay}`);
      setCurrentListLength(numTracksToDisplay)
      
      return (
        <UnorderedList
          spacing={".5em"}
          styleType={"none"}
          fontSize={["sm", "md"]}
        >
          {listItems?.map((item, i) => {
            if (i < numTracksToDisplay) {
              return (
                <ListItem key={i} w={'80%'} margin={'auto'}>
                  {item}
                </ListItem>
              )
            }
          })}
        </UnorderedList>
      )
    }
    
    const AnimatedList = () => {
      console.log("*** ANIMATED ***");
      console.log(`currentListLength: ${currentListLength}`);
      console.log(`numTracksToDisplay: ${numTracksToDisplay}`);
      setCurrentListLength(numTracksToDisplay)
      return (
        <UnorderedList
          spacing={".5em"}
          styleType={"none"}
          fontSize={["sm", "md"]}
        >
          {listItems?.map((item, i) => {
            if (i < numTracksToDisplay) {
              if (i + 1 != numTracksToDisplay) {
                return (
                  <ListItem key={i} w={"80%"} margin={"auto"}>
                    {item}
                  </ListItem>
                )
              } else {
                return (
                  <ListItem key={i} w={"80%"} margin={"auto"}>
                    <SlideFade in={true} offsetY={"-1em"}>
                      {item}
                    </SlideFade>
                  </ListItem>
                )
              }
            }
          })}
        </UnorderedList>
      )
    }
    
      return (
        numTracksToDisplay > currentListLength ?
          <AnimatedList /> :
          <StaticList />
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