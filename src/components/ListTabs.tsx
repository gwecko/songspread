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
import { motion } from "framer-motion";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";

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
    m: 0,
    pl: "30px", // item numbers will be cut off otherwise
    pt: "0px",
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

          <Divider mt={3} w={"80vw"} />
          <Box /* needed for padding on editable page but not image page */
            textAlign={"center"}
            mx={"auto"}
            w={"fit-content"}
            maxW={"400px"}
            id="tabDownload"
          >
            {username ? (
              <Heading
                as="h2"
                color={"purple.500"}
                fontSize={"1.7em"}
                marginTop={3}
                letterSpacing={"-0.06em"}
                fontWeight={"normal"}
                ml={"-5%"}
                mb={"15px"}
                whiteSpace={'normal'}
              >
                {username}&apos;s{" "}
                <Text fontWeight={"semibold"} display={"inline"} fontStyle={'italic'}>
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
        <Box position={"fixed"} right={"6%"} top={"15%"}>
          <Slider
            defaultValue={numTracksToDisplay}
            min={5}
            max={15}
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
              boxSize={"5"}
              bgColor={"purple.500"}
              w={"35px"}
              _focus={{ decoration: "none", border: "none" }}
            />
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListTabs;
