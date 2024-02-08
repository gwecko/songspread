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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatArtist, formatDuration } from "@/helpers";
import queryString from "query-string";
import SpreadCard from "./SpreadCard";

// This is parent component for Spread Card: contains Spread Header and List items

type ListTabProps = {
  session: any;
};

type RawTrackData = {
  name: string;
  artists: Object[];
  duration_ms: number;
  album: { name: string };
  external_urls: { spotify: string };
};

type FormattedTrack = {
  songDuration: string;
  artistNames: string;
  songName: string;
  songLink: string;
  albumName: string;
  listNumber: number;
  initial: object;
};

const SpreadTabs: React.FC<ListTabProps> = ({ session }) => {
  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5);
  const username = session?.token.username || session?.token.name;

  const songNumLimit = 12;

  const [shortTermTrackData, setShortTermTrackData] = useState([]);
  const [mediumTermTrackData, setMediumTermTrackData] = useState([]);
  const [longTermTrackData, setLongTermTrackData] = useState([]);
  
  const timeRanges = ["short_term", "medium_term", "long_term"];
  const [trackData, setTrackData] = useState({
    short_term: shortTermTrackData,
    medium_term: mediumTermTrackData,
    long_term: longTermTrackData,
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
    <Box>
      <Flex justifyContent={"center"}>
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

          <Divider mt={2} w={"90vw"} />
          <Box
            w={"80vw"}
            maxW={"350px"}
            mt={2}
            id="tabDownload"
            borderRadius={"10px"}
            shadow={"lg"}
            bgColor={"whiteAlpha.300"}
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
          </Box>
        </Tabs>
        <Box position={"fixed"} left={["0.45em", "10%", "20%"]} top={"15%"}>
          <Slider
            value={numTracksToDisplay}
            min={5}
            max={12}
            onChange={(val) => setNumTracksToDisplay(val)}
            orientation={"vertical"}
            isReversed
            position={"fixed"}
            top={"100px"}
            h={"35vh"}
            minH={"250px"}
          >
            <SliderTrack bgColor={"purple.50"}>
              <SliderFilledTrack bgColor={"purple.100"} />
            </SliderTrack>
            <SliderThumb boxSize={"6"} bgColor={"purple.500"} h={"40px"} />
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
};

export default SpreadTabs;
