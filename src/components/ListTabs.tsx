import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Divider,
  SliderTrack,
  SliderFilledTrack,
  Slider,
  SliderThumb,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import TrackList from "./TrackList";
import React, { useState } from "react";
import { cl, hslToHex } from "@/helpers";

interface Props {
  session: any;
  /* 
    token.username
    token.profile_pic
  */
}

const ListTabs: React.FC<Props> = ({ session }) => {
  const timeRanges = ["short_term", "medium_term", "long_term"];
  // hsl values where pageColor is the hue ('h'sl)
  const [pageColor, setPageColor] = useState(259);
  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5);
  const [timespanText, setTimespanText] = useState("1-month");
  const username = session?.token.username || session?.token.name;
  const panelStyles = {
    pl: "35px", // item numbers are otherwise cut-off
    pt: "10px",
    pb: "10px",
    borderRadius: "10px",
  };

  function handleTabTitle(index: Number): void {
    if (index === 0) {
      setTimespanText("1-month");
    } else if (index === 1) {
      setTimespanText("6-month");
    } else {
      setTimespanText("all-time");
    }
  }

  return (
    <Box>
      <Flex justifyContent={"center"}>
        <Tabs
          variant={"soft-rounded"}
          colorScheme={"purple"}
          size={"sm"}
          align="center"
          onChange={(index) => handleTabTitle(index)}
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
            {username ? (
              <Heading
                as="h2"
                color={"gray.100"}
                fontSize={"1.7em"}
                pt={2}
                letterSpacing={"-0.03em"}
                fontWeight={"bold"}
                mr={"7%"}
                whiteSpace={"normal"}
                textShadow={`1px 1px 4px ${hslToHex(
                  pageColor,
                  80,
                  40
                )}, 2px 2px 15px gray`}
              >
                {username}&apos;s{" "}
                <Text
                  fontWeight={"bold"}
                  display={"inline"}
                  fontStyle={"italic"}
                >
                  {timespanText}
                </Text>{" "}
                SongSpread
              </Heading>
            ) : (
              <Box height={"3em"} />
            )}

            <TabPanels textAlign={"left"}>
              {timeRanges.map((range) => (
                <TabPanel {...panelStyles} key={range}>
                  <TrackList
                    timeRange={range}
                    session={session}
                    numTracksToDisplay={numTracksToDisplay}
                    shadowColor={hslToHex(pageColor, 90, 40)}
                  />
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
        <Box position={"fixed"} right={["0.45em", "10%", "20%"]} top={"15%"}>
          <Slider
            value={pageColor}
            min={0}
            max={360}
            onChange={(val) => setPageColor(val)}
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
            <SliderThumb
              boxSize={"6"}
              bgColor={`hsl(${pageColor}deg 59% 59%)`}
              h={"40px"}
            />
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListTabs;
