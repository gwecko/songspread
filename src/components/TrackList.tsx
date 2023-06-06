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
      accessToken?: string;
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
  isHidden: boolean,
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
    headers: { Authorization: `Bearer ${Props.session?.token.accessToken}` },
  };
  
  // data fetching
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        // Array of object data formatted to what I want
        const tracks: Track[] = res.items.map((item: FetchedTrack, i: number) => {
          return {
            songDuration: formatDuration(item.duration_ms),
            artistNames: formatArtist(item.artists),
            songName: item.name,
            songLink: item.external_urls.spotify,
            albumName: item.album.name,
            listNumber: i + 1,
            isHidden: i >= numTracksToDisplay,
          }
        })
        setTrackData([...tracks])
        // setTrackData([...tracks.slice(numTracksToDisplay, 15)])
        // setDisplayedTrackData([...tracks.slice(0, numTracksToDisplay)])
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // controls displayed through transferring a track between the arrays
  // useEffect(() => {
  //   if (trackData && displayedTrackData) {
  //     // add a new track to the displayed list
  //     if (numTracksToDisplay > displayedTrackData.length) {
  //       const track: any = trackData.shift()
  //       setDisplayedTrackData([...displayedTrackData, track])
  //       setTrackData([...trackData])
  //     }
  //     // remove a track from the displayed list
  //     else if (numTracksToDisplay < displayedTrackData.length) {
  //       const track: any = displayedTrackData.pop()
  //       setDisplayedTrackData([...displayedTrackData])
  //       setTrackData([track, ...trackData])
  //     }
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [numTracksToDisplay])
  
  const Item = ({ songLink, songName, artistNames, listNumber, isHidden }: Track, key: Key) => {
    
    const isPresent = useIsPresent();
    
    const animation = {
      key: songName,
      layout: true,
      layoutDependency: numTracksToDisplay,
      variants: {
        hidden: { opacity: 0, scaleY: 0, zIndex: 0 },
        in: { opacity: 1, scaleY: 1, zIndex: 1 },
      },
      initial: listNumber === numTracksToDisplay ? 'hidden' : false,
      animate: 'in',
      exit: { opacity: 0, scaleY: 0, zIndex: -1 },
      transition: { duration: 0.3 },
    };

    return ( 
        listNumber <= numTracksToDisplay ? <motion.h2 {...animation}>
          <Link href={songLink} _hover={{ textDecoration: "none" }} isExternal>
            {listNumber}. {songName} - {artistNames}
          </Link>
        </motion.h2> : null
    );
  };
  

  return trackData !== undefined ? (
    <Box fontSize={["sm", "md"]} w={"80%"} margin={"auto"} flexWrap={"wrap"}>
      <AnimatePresence>
        {trackData.map((track, i) => (
          <Item key={i} {...track} />
        ))}
      </AnimatePresence>
    </Box>
  ) : (
    <Spinner color="purple.400" size="xl" thickness=".6em" />
  );
};

export default TrackList;