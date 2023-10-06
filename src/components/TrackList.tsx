import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { formatDuration, formatArtist, cl } from "@/helpers";
import { List, Box, Link, Text, list } from "@chakra-ui/react";
import { AnimatePresence, animate, motion, useIsPresent } from "framer-motion";
import LoadingSkeleton from "./LoadingSkeleton";

interface TrackListProps {
  numTracksToDisplay: number;
  timeRange: string;
  session: {
    token: {
      name?: string;
      email: string;
      picture?: string;
      access_token?: string;
    };
  };
  shadowColor: string;
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
  initial: object;
};

const TrackList: React.FC<TrackListProps> = ({
  timeRange,
  numTracksToDisplay,
  session,
  shadowColor,
}) => {
  const songNumLimit = 12;
  const [trackData, setTrackData] = useState<Track[]>([]);

  // get data from spotify on page load
  const url =
    "https://api.spotify.com/v1/me/top/tracks?" +
    queryString.stringify({ time_range: timeRange, limit: songNumLimit });
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
        setTrackData([...tracks]);
        // setTrackData([...tracks.slice(numTracksToDisplay, 15)]);
        // setDisplayedTrackData([...tracks.slice(0, numTracksToDisplay)]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const Item: React.FC<Track> = ({
    songDuration,
    artistNames,
    songName,
    songLink,
    albumName,
    listNumber,
    initial
  }) => {
    return (
      <motion.li
        initial={initial}
        animate={{ opacity: 1, translateY: '0' }}
        exit={{ transition:{
          type: "spring",
          damping: 25,
          stiffness: 400
        }, opacity: 0, translateY: '-1em', height: 0, margin: 0, padding: 0 }}
        style={{ lineHeight: "1em", paddingBottom: "0.9em" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400
        }}
      >
        <Link
          href={songLink}
          isExternal
          _hover={{ textDecoration: "none" }}
          textIndent={"-1.2em"}
        >
          {/* LIST NUMBER */}
          <Text
            display={"inline-block"}
            fontWeight={"medium"}
            fontStyle={"italic"}
            color={"gray.100"}
            textShadow={`1px 1px 1px ${shadowColor}, 1px 1px 3px gray`}
          >
            {listNumber}.&nbsp;
          </Text>
          {/* SONG NAME */}
          <Box display={"inline"}>
            <Text
              fontWeight={"extrabold"}
              color={"gray.50"}
              display={"inline"}
              textShadow={`2px 2px 1px ${shadowColor}, 1px 1px 6px gray`}
            >
              {songName}
            </Text>
            {/* ARTIST NAMES */}
            <Text
              fontWeight={"medium"}
              display={"inline"}
              color={"gray.50"}
              textShadow={`2px 2px 2px ${shadowColor}, 1px 1px 3px gray`}
            >
              &nbsp;-&nbsp;{artistNames}
            </Text>
          </Box>
        </Link>
      </motion.li>
    );
  };
  
  // last item is animated only if it is "new"
  const [animatedIndex, setAnimatedIndex] = useState(numTracksToDisplay + 1)
  useEffect(() => {
    if (numTracksToDisplay > animatedIndex) {
      setAnimatedIndex(numTracksToDisplay - 1)
    } else if (numTracksToDisplay < animatedIndex) {
      setAnimatedIndex(numTracksToDisplay)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numTracksToDisplay])

  return trackData.length ? (
    <Box fontSize={["sm", "md"]} w={"90%"}>
      <motion.ul style={{listStyle: 'none'}}>
      <AnimatePresence mode="popLayout">
        {trackData.slice(0, numTracksToDisplay).map((item, index) => (
          <Item {...item} key={index} initial={index === animatedIndex ? {opacity: 0, translateY: '-1.6em'} : {opacity: 1}} />
        ))}
      </AnimatePresence>
      </motion.ul>
    </Box>
  ) : (
    <Box w={"100%"} ml={"-0.5em"}>
      <LoadingSkeleton
        maxLength={songNumLimit}
        displayLength={numTracksToDisplay}
      />
    </Box>
  );
};

export default TrackList;
