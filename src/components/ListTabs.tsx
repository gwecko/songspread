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
  const tabPanelStyles ={ pl: '0', }

  return (
    <Box display={"flex"} >
      <Slider
        defaultValue={numTracksToDisplay}
        min={5}
        max={15}
        onChange={(val) => setNumTracksToDisplay(val)}
        orientation={"vertical"}
        isReversed
        position={'fixed'}
        top={'50%'}
        left={'20px'}
        h={"35vh"}
        minH={"250px"}
        transform={"translateY(50%)"}
        // ml={"10%"}
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

      <Tabs
        variant={"soft-rounded"}
        colorScheme={"purple"}
        textAlign={"center"}
        align="center"
        w={"80%"}
        size={"sm"}
        isLazy
      >
        <TabList>
          <Tab>one month</Tab>
          <Tab>six months</Tab>
          <Tab>all months</Tab>
        </TabList>

        <Divider w={"90%"} mt={3} ml={'auto'}/>

        <TabPanels textAlign={"left"} id="tabDownload" w={'80%'}>
          <TabPanel {...tabPanelStyles}>
            <TrackList
              session={Props.session}
              timeRange={short}
              numTracksToDisplay={numTracksToDisplay}
            />
          </TabPanel>
          <TabPanel {...tabPanelStyles}>
            <TrackList
              session={Props.session}
              timeRange={medium}
              numTracksToDisplay={numTracksToDisplay}
            />
          </TabPanel>
          <TabPanel {...tabPanelStyles}>
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
