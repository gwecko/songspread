import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { formatDuration, formatArtist, cl } from "@/helpers";
import { List, Box, Link, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
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
};

const TrackList: React.FC<TrackListProps> = ({
  timeRange,
  numTracksToDisplay,
  session,
  shadowColor,
}) => {
  const songNumLimit = 12;
  const [trackData, setTrackData] = useState<Track[]>([]);
  // ** for displayed tracks
  const [displayedTrackIds, setDisplayedTrackIds] = useState<number[]>(
    Array.from({ length: numTracksToDisplay })
  );

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

  // ** controls displayed tracks
  /*   useEffect(() => {
    if (trackData && displayedTrackIds) {
      // add a new track to the displayed list
      if (numTracksToDisplay > displayedTrackIds.length) {
        const trackId: number = numTracksToDisplay;
        setDisplayedTrackIds([...displayedTrackIds, trackId]);
      }
      // remove a track from the displayed list
      else if (numTracksToDisplay < displayedTrackIds.length) {
        displayedTrackIds.pop();
        setDisplayedTrackIds([...displayedTrackIds]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numTracksToDisplay]); */

  const Item: React.FC<Track> = ({
    songDuration,
    artistNames,
    songName,
    songLink,
    albumName,
    listNumber,
  }) => {
    const itemAnimation = {
      // layout: true,
      // initial: { rotateX: 90 },
      // animate: { rotateX: 0 },
      // transition: {
      //   type: "spring",
      //   stiffness: 500,
      // },
    };

    return (
      <motion.li
        {...itemAnimation}
        style={{ lineHeight: "1em", paddingBottom: "0.9em" }}
      >
        <Link
          href={songLink}
          isExternal
          _hover={{ textDecoration: "none" }}
          textIndent={"-1.2em"}
        >
          <Text
            display={"inline-block"}
            fontWeight={"normal"}
            fontStyle={"italic"}
            color={"gray.100"}
            textShadow={`1px 1px 2px ${shadowColor}}`}
          >
            {listNumber}.&nbsp;
          </Text>
          <Box display={"inline"}>
            <Text
              fontWeight={"extrabold"}
              color={"gray.50"}
              display={"inline"}
              textShadow={`1px 2px 2px ${shadowColor}}`}
            >
              {songName}
            </Text>
            <Text
              fontWeight={"semibold"}
              display={"inline"}
              color={"gray.100"}
              textShadow={`1px 1px 1px ${shadowColor}}`}
            >
              &nbsp;-&nbsp;{artistNames}
            </Text>
          </Box>
        </Link>
      </motion.li>
    );
  };

  return trackData ? (
    <Box fontSize={["sm", "md"]} w={"90%"}>
      <AnimatePresence>
        <List>
          {trackData.map((item) => {
            // ** controls displayed tracks
            if (item.listNumber <= numTracksToDisplay) {
              return <Item {...item} key={item.listNumber} />;
            }
          })}
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
