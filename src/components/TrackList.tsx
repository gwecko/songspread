import React, { FC, Key, ReactNode, useEffect, useRef, useState } from "react";
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
  list,
  Flex,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { zIndex } from "html2canvas/dist/types/css/property-descriptors/z-index";


interface Props {
  numTracksToDisplay: number;
  timeRange?: string;
  session: {
    token: {
      name?: string;
      email: string;
      picture?: string;
      access_token?: string;
    };
  };
}

interface FetchedTrack {
  name: string;
  artists: Object[];
  duration_ms: number;
  album: { name: string };
  external_urls: { spotify: string };
}

type Track = {
  songDuration: string,
  artistNames: string,
  songName: string,
  songLink: string,
  albumName: string,
  listNumber: number,
  isDisplayed: boolean,
}

const TrackList: React.FC<Props> = (Props) => {
  const { timeRange, numTracksToDisplay } = Props;
  const [trackData, setTrackData] = useState<Track[]>()
  const [displayedTrackData, setDisplayedTrackData] = useState<Track[]>()
  
  // get data from spotify on page load
  const url = "https://api.spotify.com/v1/me/top/tracks?" + queryString.stringify({
    time_range: timeRange,
    limit: 15,
  });
  const options = {
    headers: { Authorization: `Bearer ${Props.session?.token.access_token}` },
  };
  
  // data fetching
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then(async (res) => {
        // Array of object data formatted to what I want
        const tracks: Track[] = await res.items?.map((item: FetchedTrack, i: number) => {
          return {
            songDuration: formatDuration(item.duration_ms),
            artistNames: formatArtist(item.artists),
            songName: item.name,
            songLink: item.external_urls.spotify,
            albumName: item.album.name,
            listNumber: i + 1,
            isDisplayed: i <= numTracksToDisplay
          }
        })
        setTrackData([...tracks.slice(numTracksToDisplay, 15)])
        setDisplayedTrackData([...tracks.slice(0, numTracksToDisplay)])
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // controls displayed through transferring a track between the arrays
  useEffect(() => {
    if (trackData && displayedTrackData) {
      // add a new track to the displayed list
      if (numTracksToDisplay > displayedTrackData.length) {
        const track: any = trackData.shift()
        setDisplayedTrackData([...displayedTrackData, track])
        setTrackData([...trackData])
      }
      // remove a track from the displayed list
      else if (numTracksToDisplay < displayedTrackData.length) {
        const track: any = displayedTrackData.pop()
        setDisplayedTrackData([...displayedTrackData])
        setTrackData([track, ...trackData])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numTracksToDisplay])
  
  
  const Item = ({ songLink, songName, artistNames, listNumber, isDisplayed }: Track) => {
    
    const isPresent = useIsPresent()
    
    const animation = {
      layout: true,
      transition: { duration: 0.2 },
      variants: {
        lastItem: {
          opacity: 0.5,
          scale: 1,
          transform: "rotateX(90deg)",
        },
        in: {
          opacity: 1,
          scale: 1,
          transform: "rotateX(0deg)",
          transition: { type: "spring", stiffness: '700', },
        },
      },
      initial: listNumber === numTracksToDisplay ? "lastItem" : "in",
      animate: "in",
      exit: {
        opacity: 0,
        transform: "rotateX(90deg)",
        transition: { ease: "easeIn", duration: 0.2 },
      },
    };
    
    return (
      <motion.h2 {...animation} key={songName}>
        <Link
          href={songLink}
          isExternal
          _hover={{ textDecoration: "none" }}
        >
            {listNumber}. {songName} - {artistNames}
        </Link>
      </motion.h2>
    );
  };
  

  return displayedTrackData ? (
    <Box fontSize={["sm", "md"]} w={"80%"} margin={"auto"}>
      <AnimatePresence>
        {displayedTrackData.map((track, i) => (
          <Item key={i} {...track} />
        ))}
      </AnimatePresence>
    </Box>
  ) : (
      <Flex justifyContent={'center'}>
        <Spinner color="purple.400" size="xl" thickness=".6em" />
      </Flex>
  );
};

export default TrackList;