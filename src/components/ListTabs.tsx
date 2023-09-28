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
  keyframes,
  color,
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
  const [short, medium, long] = ["short_term", "medium_term", "long_term"];
  // hsl values where pageColor is the hue ('h'sl)
  const [pageColor, setPageColor] = useState(259);
  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5);
  const [timespanText, setTimespanText] = useState("1-month");
  const username = session?.token.username || session?.token.name;
  const panelStyles = {
    pl: "30px", // item numbers are otherwise cut-off
    pt: "10px",
    pb: '10px',
    borderRadius: '10px',
  };

  function handleTabFocus(index: Number): void {
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
          onChange={(index) => handleTabFocus(index)}
          isLazy
        >
          <TabList w={"max-content"}>
            <Tab>1-month</Tab>
            <Tab>6-months</Tab>
            <Tab>all-time</Tab>
          </TabList>

          <Divider mt={2} w={"90vw"} />
          <Box /* needed for padding on editable page but not image page */
            // ml={"-0%"}
            w={"fit-content"}
            maxW={"350px"}
            id="tabDownload"
            borderRadius={"10px"}
            shadow={"lg"}
            bgColor={"whiteAlpha.400"}
          >
            {username ? (
              <Heading
                as="h2"
                color={"gray.100"}
                fontSize={"1.7em"}
                mt={2}
                pt={2}
                letterSpacing={"-0.05em"}
                fontWeight={"bold"}
                mr={"7%"}
                whiteSpace={"normal"}
                textShadow={`2px 2px 3px ${hslToHex( pageColor, 60, 40)}, 2px 2px 12px gray`}
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
              <TabPanel {...panelStyles}>
                {/* weird image padding is here */}
                <TrackList
                  timeRange={short}
                  session={session}
                  numTracksToDisplay={numTracksToDisplay}
                  shadowColor={hslToHex(pageColor, 60, 40)}
                />
              </TabPanel>
              <TabPanel {...panelStyles}>
                <TrackList
                  timeRange={medium}
                  session={session}
                  numTracksToDisplay={numTracksToDisplay}
                  shadowColor={hslToHex(pageColor, 60, 40)}
                />
              </TabPanel>
              <TabPanel {...panelStyles}>
                <TrackList
                  timeRange={long}
                  session={session}
                  numTracksToDisplay={numTracksToDisplay}
                  shadowColor={hslToHex(pageColor, 60, 40)}
                />
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
        <Box position={"fixed"} left={"1%"} top={"15%"}>
          <Slider
            defaultValue={pageColor}
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
            <SliderTrack bgColor={"purple.100"}>
              <SliderFilledTrack bgColor={"purple.100"} />
            </SliderTrack>
            <SliderThumb
              boxSize={"6"}
              bgColor={`hsl(${pageColor}deg 59% 59%)`}
              h={"40px"}
            />
          </Slider>
        </Box>
        <Box position={"fixed"} right={"1%"} top={"15%"}>
          <Slider
            defaultValue={numTracksToDisplay}
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
            <SliderTrack bgColor={"purple.100"}>
              <SliderFilledTrack bgColor={"purple.100"} />
            </SliderTrack>
            <SliderThumb boxSize={"6"} bgColor={"purple.500"} h={"40px"} />
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListTabs;
