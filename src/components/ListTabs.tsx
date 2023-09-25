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
import { cl } from "@/helpers";


interface Props {
  session: any;
  /* 
    token.username
    token.profile_pic
  */
}


const ListTabs: React.FC<Props> = ({ session }) => {
  const [short, medium, long] = ["short_term", "medium_term", "long_term"];
  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5);
  const [timespanText, setTimespanText] = useState("1-month");
  const username = session?.token.username || session?.token.name;
  const panelStyles = {
    pl: "30px", // item numbers will be cut off otherwise
    pt: "10px",
    pb: '10px',
    // mr: '4%',
    // right: '30px',
    borderRadius: '10px',
  };

  function handleTabFocus(index: Number) {
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
          // lazyBehavior='keepMounted'
        >
          <TabList w={"max-content"}>
            <Tab>1-month</Tab>
            <Tab>6-months</Tab>
            <Tab>all-time</Tab>
          </TabList>

          <Divider mt={2} w={"90vw"} />
          <Box /* needed for padding on editable page but not image page */
            // textAlign={"center"}
            ml={"-10%"}
            w={"fit-content"}
            maxW={"350px"}
            id="tabDownload"
            borderRadius={"10px"}
            shadow={"lg"}
            // boxShadow={'lg'}
            bgColor={"whiteAlpha.200"}
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
                textShadow={"2px 2px 3px #6B46C1"}
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
                />
              </TabPanel>
              <TabPanel {...panelStyles}>
                <TrackList
                  timeRange={medium}
                  session={session}
                  numTracksToDisplay={numTracksToDisplay}
                />
              </TabPanel>
              <TabPanel {...panelStyles}>
                <TrackList
                  timeRange={long}
                  session={session}
                  numTracksToDisplay={numTracksToDisplay}
                />
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
        <Box position={"fixed"} right={"3%"} top={"15%"}>
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
            <SliderThumb
              boxSize={"6"}
              bgColor={"purple.500"}
              w={"33px"}
              _focus={{ decoration: "none", border: "none" }}
            />
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListTabs;
