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
} from "@chakra-ui/react";
import TrackList from "./TrackList";
import React, { useState } from "react";

interface Props {
  session: any;
}

const ListTabs: React.FC<Props> = (Props) => {
  const [short, medium, long] = ["short_term", "medium_term", "long_term"];

  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5);
  const sliderStyles = {
    fontSize: "sm",
    fontWeight: "semibold",
    color: "purple.800",
    mt: 2,
  };

  return (
    <Box display={'flex'}>
      <Slider
        defaultValue={numTracksToDisplay}
        min={5}
        max={15}
        onChange={(val) => setNumTracksToDisplay(val)}
        orientation={'vertical'}
        isReversed
        h={"35vh"}
        minH={'250px'}
        transform={"translateY(50%)"}
      >
        <SliderTrack bgColor={"purple.100"}>
          <SliderFilledTrack bgColor={"purple.100"} />
        </SliderTrack>
        <SliderThumb boxSize={"10"} bgColor={"purple.500"} w={"14px"} _focus={{ decoration: 'none'}}/>
      </Slider>
      
      <Tabs
        variant={"soft-rounded"}
        colorScheme={"purple"}
        align={"center"}
        w={"100%"}
        size={"sm"}
        isLazy
      >
        <TabList>
          <Tab>one month</Tab>
          <Tab>six months</Tab>
          <Tab>all months</Tab>
        </TabList>

        <Divider w={"80%"} mt={3} />

        <TabPanels textAlign={"left"} id="tabDownload">
          <TabPanel>
            <TrackList
              session={Props.session}
              timeRange={short}
              numTracksToDisplay={numTracksToDisplay}
            />
          </TabPanel>
          <TabPanel>
            <TrackList
              session={Props.session}
              timeRange={medium}
              numTracksToDisplay={numTracksToDisplay}
            />
          </TabPanel>
          <TabPanel>
            <TrackList
              session={Props.session}
              timeRange={long}
              numTracksToDisplay={numTracksToDisplay}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ListTabs;
