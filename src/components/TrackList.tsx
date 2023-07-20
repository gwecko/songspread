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
  Text,
  OrderedList,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
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

type FetchedTrack = {
  name: string;
  artists: Object[];
  duration_ms: number;
  album: { name: string };
  external_urls: { spotify: string };
};

type Track = {
  songDuration: string;
  artistNames: string;
  songName: string;
  songLink: string;
  albumName: string;
  listNumber: number;
};

const TrackList: React.FC<Props> = ({
  timeRange,
  numTracksToDisplay,
  session,
}) => {
  const songNumLimit = 15;
  const [trackData, setTrackData] = useState<Track[]>();
  const [displayedTrackData, setDisplayedTrackData] = useState<Track[]>();

  // get data from spotify on page load
  const url =
    "https://api.spotify.com/v1/me/top/tracks?" +
    queryString.stringify({
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
        // Array of formatted object data
        if (res.items) {
          return res.items.map((item: FetchedTrack, i: number) => {
            return {
              songDuration: formatDuration(item.duration_ms),
              artistNames: formatArtist(item.artists),
              songName: item.name,
              songLink: item.external_urls.spotify,
              albumName: item.album.name,
              listNumber: i + 1,
            };
          });
          // prevents TypeError: undefined is not an object (tracks.slice)
        } else {
          return [];
        }
      })
      .then((tracks: Track[]) => {
        setTrackData([...tracks.slice(numTracksToDisplay, 15)]);
        setDisplayedTrackData([...tracks.slice(0, numTracksToDisplay)]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // controls displayed through transferring a track between the arrays
  useEffect(() => {
    if (trackData && displayedTrackData) {
      // add a new track to the displayed list
      if (numTracksToDisplay > displayedTrackData.length) {
        const track: any = trackData.shift();
        setDisplayedTrackData([...displayedTrackData, track]);
        setTrackData([...trackData]);
      }
      // remove a track from the displayed list
      else if (numTracksToDisplay < displayedTrackData.length) {
        const track: any = displayedTrackData.pop();
        setDisplayedTrackData([...displayedTrackData]);
        setTrackData([track, ...trackData]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numTracksToDisplay]);

  const Item = ({ songLink, songName, artistNames, listNumber }: Track) => {
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
          transition: { type: "spring", stiffness: "500" },
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
      <motion.li {...itemAnimation} key={songName}>
        <Link
          href={songLink}
          isExternal
          _hover={{ textDecoration: "none" }}
          textIndent={'-1.2em'}
        >
          <Text display={"inline-block"} fontWeight={'thin'} color={'gray.700'}>
            {listNumber}.
          </Text>
          <Box display={"inline"}>
            <Text
              fontWeight={"semibold"}
              color={"purple.900"}
              display={"inline"}
            >
              {songName}
            </Text>
            <Text fontWeight={"thin"} display={"inline"}>
              &nbsp;-&nbsp;{artistNames}
            </Text>
          </Box>
        </Link>
      </motion.li>
    );
  };

  return displayedTrackData?.length ? (
    <Box fontSize={["sm", "md"]} w={["95%", null, null, null, "480px"]}>
      <AnimatePresence>
        <List>
          {displayedTrackData.map((track, i) => (
            <Item key={i} {...track} />
          ))}
        </List>
      </AnimatePresence>
    </Box>
  ) : (
    <Box w={"100%"} mx={"auto"}>
      <LoadingSkeleton
        maxLength={songNumLimit}
        displayLength={numTracksToDisplay}
      />
    </Box>
  );
};

export default TrackList;
