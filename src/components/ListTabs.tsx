import { Tabs, TabList, Tab, TabPanels, TabPanel, Text, Divider, SliderTrack, SliderFilledTrack, Slider, SliderThumb, SliderMark } from "@chakra-ui/react";
import TrackList from "./TrackList";
import React, { useState } from "react";

interface Props {
  session: any
}

const ListTabs: React.FC<Props> = (Props) => {
  
  const [short, medium, long] = ["short_term", "medium_term", "long_term"];
  
  const [numTracksToDisplay, setNumTracksToDisplay] = useState(5)
  const sliderStyles = {
    fontSize: 'sm',
    fontWeight: 'semibold',
    color: 'purple.800',
    mt: 2
  };
  
  return (
    <Tabs
      variant={"soft-rounded"}
      colorScheme={"purple"}
      align={"center"}
      w={'100%'}
      size={'sm'}
    >
      
      <TabList>
        <Tab>one month</Tab>
        <Tab>six months</Tab>
        <Tab>all months</Tab>
      </TabList>

      <Slider
        w={'80%'}
        maxW={'300px'}
        position={"fixed"}
        my={4}
        ml={'auto'}
        defaultValue={numTracksToDisplay}
        min={5}
        max={15}
        onChange={(val) => setNumTracksToDisplay(val)}
      >
        <SliderMark value={5} ml={'-1'} {...sliderStyles}>5</SliderMark>
        <SliderMark value={10} ml={'-2'} {...sliderStyles}>10</SliderMark>
        <SliderMark value={15} ml={'-2'} {...sliderStyles}>15</SliderMark>
        <SliderTrack bgColor={"purple.100"}>
          <SliderFilledTrack bgColor={"purple.100"} />
        </SliderTrack>
        <SliderThumb bgColor={"purple.500"} w={'25px'} />
      </Slider>

      <Divider w={"80%"} mt={2}/>

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
  );
}

export default ListTabs