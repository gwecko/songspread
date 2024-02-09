import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  SliderTrack,
  SliderFilledTrack,
  Slider,
  SliderThumb,
  Box,
  Flex,
  List,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatArtist, formatDuration } from "@/helpers";
import queryString from "query-string";
import SpreadCard from "./SpreadCard";

// This is parent component for Spread Card: contains Spread Header and List items

type ListTabProps = {
  session: any;
  numTracksToDisplay: number;
};

type RawTrackData = {
  name: string;
  artists: Object[];
  duration_ms: number;
  album: { name: string };
  external_urls: { spotify: string };
};

export type FormattedTrack = {
  songDuration: string;
  artistNames: string;
  songName: string;
  songLink: string;
  albumName: string;
  listNumber: number;
  initial: object;
};

const SpreadTabs: React.FC<ListTabProps> = ({ session, numTracksToDisplay }) => {

  const username = session?.token.username || session?.token.name;

  const songNumLimit = 12 as const;

  const timeRanges = ["short_term", "medium_term", "long_term"];
  const [trackData, setTrackData] = useState({
    short_term: [],
    medium_term: [],
    long_term: [],
  });

  // query Spotify for all 3 time ranges at once
  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${session?.token.access_token}` },
    };
    timeRanges.forEach((range, index) => {
      const url =
        "https://api.spotify.com/v1/me/top/tracks?" +
        queryString.stringify({ time_range: range, limit: songNumLimit });

      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          // Array of formatted object data
          if (res.items) {
            return res.items.map((item: RawTrackData, i: number) => ({
              // possible error: may need to wrap this in a return statement
              songName: item.name,
              songLink: item.external_urls.spotify,
              songDuration: formatDuration(item.duration_ms),
              artistNames: formatArtist(item.artists),
              albumName: item.album.name,
              listNumber: i + 1,
            }));
            // prevents TypeError: undefined is not an object (tracks.slice)
          } else {
            return [];
          }
        })
        .then((formattedTracks: FormattedTrack[]) => {
          setTrackData((prev) => ({
            ...prev,
            [range]: formattedTracks,
          }));
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Flex flexDir={"row"} justifyContent={"space-between"} mx={2}>
      <Tabs
        variant={"soft-rounded"}
        colorScheme={"purple"}
        size={"sm"}
        align="center"
        isLazy
      >
        <TabList w={"max-content"}>
          <Tab>1-month</Tab>
          <Tab>6-months</Tab>
          <Tab>all-time</Tab>
        </TabList>

        <Divider mt={2} w={"80%"} />

        <Container
          id="tabDownload"
          display={"flex"}
          mt={4}
          mb={2}
          px={0}
          borderRadius={"16px"}
          shadow={"0px 4px 4px rgba(0, 0, 0, 0.4), 0px 2px 0px rgb(255, 255, 255, 0.6), 0px 8px 15px rgb(0, 0, 0, .4)"}
          bgColor={"whiteAlpha.300"}
          w={"90%"}
          border={'1px solid white'}
        >
          <TabPanels>
            {timeRanges.map((range, index) => (
              <TabPanel key={index}>
                <List>
                  <SpreadCard
                    username={username}
                    timeRange={range}
                    numTracksToDisplay={numTracksToDisplay}
                    songlist={trackData[range as keyof typeof trackData]}
                  />
                </List>
              </TabPanel>
            ))}
          </TabPanels>
        </Container>
      </Tabs>
    </Flex>
  );
};

export default SpreadTabs;
