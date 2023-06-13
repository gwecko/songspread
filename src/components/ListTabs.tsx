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
  SliderMark,
  Box,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import TrackList from "./TrackList";
import React, { useState } from "react";

interface Props {
  session: any;
}

const ListTabs: React.FC<Props> = (Props) => {
  const [short, medium, long] = ["short_term", "medium_term", "long_term"];

  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5);

  return (
    <Box w={"100vw"}>
      <Flex>
        <Tabs
          variant={"soft-rounded"}
          colorScheme={"purple"}
          size={"sm"}
          align="center"
          isLazy
        >
          <TabList>
            <Tab>one month</Tab>
            <Tab>six months</Tab>
            <Tab>all months</Tab>
          </TabList>

          <Divider w={"80%"} mt={2} />
          <TabPanels id="tabDownload" textAlign={"left"}>
            <TabPanel w={"95%"}>
              <TrackList
                session={Props.session}
                timeRange={short}
                numTracksToDisplay={numTracksToDisplay}
              />
            </TabPanel>
            <TabPanel w={"95%"}>
              <TrackList
                session={Props.session}
                timeRange={medium}
                numTracksToDisplay={numTracksToDisplay}
              />
            </TabPanel>
            <TabPanel w={"95%"}>
              <TrackList
                session={Props.session}
                timeRange={long}
                numTracksToDisplay={numTracksToDisplay}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box position={"fixed"} right={"7%"} top={"15%"}>
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
