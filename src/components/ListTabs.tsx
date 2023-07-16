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
} from "@chakra-ui/react";
import TrackList from "./TrackList";
import React, { useState } from "react";

interface Props {
  session: any;
}

const ListTabs: React.FC<Props> = ({ session }) => {
  const [short, medium, long] = ["short_term", "medium_term", "long_term"];

  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5);
  const panelStyles = {
    p: 0,
    m: 0,
  }

  return (
    <Box>
      <Flex justifyContent={"center"}>
        <Tabs
          variant={'soft-rounded'}
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

          <Divider my={3} />
          <Box mx={5} mt={3}> {/* needed for padding on editable page but not image page */}
            <TabPanels textAlign={"left"} id="tabDownload">
              <TabPanel {...panelStyles}> {/* weird image padding is here */}
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
