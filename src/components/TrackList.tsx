import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { formatDuration, formatArtist, cl } from "@/helpers";
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
  Heading,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import LoadingSkeleton from "./LoadingSkeleton";


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

const TrackList: React.FC<Props> = ({timeRange, numTracksToDisplay, session}) => {
  const [trackData, setTrackData] = useState<Track[]>()
  const [displayedTrackData, setDisplayedTrackData] = useState<Track[]>()
  const songNumLimit = 15
  
  // get data from spotify on page load
  const url = "https://api.spotify.com/v1/me/top/tracks?" + queryString.stringify({
    time_range: timeRange,
    limit: songNumLimit,
  });
  const options = {
    headers: { Authorization: `Bearer ${session?.token.access_token}` },
  };
  
  // data fetching
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        // Array of object data formatted to what I want
        return res.items?.map((item: FetchedTrack, i: number) => {
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
      }).then(tracks => {
        setTrackData([...tracks.slice(numTracksToDisplay, 15)]);
        setDisplayedTrackData([...tracks.slice(0, numTracksToDisplay)]);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  
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
    
    const itemAnimation = {
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
          transition: { type: "spring", stiffness: '500', },
        },
      },
      initial: listNumber === numTracksToDisplay ? "lastItem" : "in",
      animate: "in",
      exit: {
        opacity: 0,
        transform: "rotateX(180deg)",
        transition: { ease: "easeIn", duration: 0.2 },
      },
    };
    
    return (
      <motion.h2 {...itemAnimation} key={songName}>
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
    <Box
      fontSize={["sm", "md"]}
      w={['80%', null, null, null, '480px']}
      margin={"auto"}
      padding={0}
    >
      <AnimatePresence>
        {displayedTrackData.map((track, i) => (
          <Item key={i} {...track} />
        ))}
      </AnimatePresence>
    </Box>
  ) : (
    <LoadingSkeleton
      maxLength={songNumLimit}
      displayLength={numTracksToDisplay}
    />
  );
};

export default TrackList;