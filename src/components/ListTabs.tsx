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
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
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
  const [timespanText, setTimespanText] = useState('1-month')
  const username = session?.token.username ?? session?.token.name
  const shortTermRef = useRef(null)
  const mediumTermRef = useRef(null)
  const longTermRef = useRef(null)
  const panelStyles = {
    m: 0,
    pl: "30px", // item numbers will be cut off otherwise
    pt: "0px",
  };

  const animationKeyframes = keyframes`
    0% { background-position: 0% 0% }
    100% { background-position: 200% 0% }
  `;
  const animation = `${animationKeyframes} 2s ease-in-out infinite`;
  const animationGradient = `linear-gradient(to right, #9F7AEA, #6B46C1, #9F7AEA)`;
  
  // useEffect(() => {
    function handleTabFocus(ref: MutableRefObject<any>) {
      if (ref === shortTermRef) {
        setTimespanText('1-month')
      } else if (ref === mediumTermRef) {
        setTimespanText('6-month')
      } else {
        setTimespanText('all-time')
      }
    }
  // }, [])

  return (
    <Box>
      <Flex justifyContent={"center"}>
        <Tabs
          variant={"soft-rounded"}
          colorScheme={"purple"}
          size={"sm"}
          align="center"
          isLazy
          // lazyBehavior='keepMounted'
        >
          <TabList w={"max-content"}>
            <Tab>one month</Tab>
            <Tab>six months</Tab>
            <Tab>all months</Tab>
          </TabList>

          <Divider mt={3} w={"80vw"} />
          <Box /* needed for padding on editable page but not image page */
            textAlign={"center"}
            mx={"auto"}
            w={'fit-content'}
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
                whiteSpace={"nowrap"}
              >
                {username}&apos;s{" "}
                <Text fontWeight={"semibold"} display={"inline"}>
                  {timespanText}
                </Text>{" "}
                SongSpread
              </Heading>
            ) : (
              <Box height={"3em"} />
            )}

            <TabPanels textAlign={"left"}>
              <TabPanel
                {...panelStyles}
                onClick={() => handleTabFocus(shortTermRef)}
              >
                {/* weird image padding is here */}
                <TrackList
                  ref={shortTermRef}
                  timeRange={short}
                  session={session}
                  numTracksToDisplay={numTracksToDisplay}
                />
              </TabPanel>
              <TabPanel
                {...panelStyles}
                onClick={() => handleTabFocus(mediumTermRef)}
              >
                <TrackList
                  ref={mediumTermRef}
                  timeRange={medium}
                  session={session}
                  numTracksToDisplay={numTracksToDisplay}
                />
              </TabPanel>
              <TabPanel
                {...panelStyles}
                onClick={() => handleTabFocus(longTermRef)}
              >
                <TrackList
                  ref={longTermRef}
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
