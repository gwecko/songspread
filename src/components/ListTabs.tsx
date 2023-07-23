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
  const username = session?.token?.username;
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
            mx={"2em"}
            maxW={"320px"}
            id="tabDownload"
          >
            {username ? (
              <Box
                as={motion.div}
                style={{
                  fontSize: "x-large",
                  color: "transparent",
                  backgroundImage: animationGradient,
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                }}
                fontWeight={'bold'}
                letterSpacing={'tighter'}
                ml={'-5%'}
                animation={animation}
                whiteSpace={"nowrap"}
              >
                {username}&apos;s SongSpread
              </Box>
            ) : (
              <Box height={"30px"} />
            )}

            <TabPanels textAlign={"left"}>
              <TabPanel {...panelStyles}>
                {/* weird image padding is here */}
                <TrackList
                  session={session}
                  timeRange={short}
                  numTracksToDisplay={numTracksToDisplay}
                />
              </TabPanel>
              <TabPanel {...panelStyles}>
                <TrackList
                  session={session}
                  timeRange={medium}
                  numTracksToDisplay={numTracksToDisplay}
                />
              </TabPanel>
              <TabPanel {...panelStyles}>
                <TrackList
                  session={session}
                  timeRange={long}
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
