import { Tabs, TabList, Tab, TabPanels, TabPanel, Text, Divider, SliderTrack, SliderFilledTrack, Slider, SliderThumb, SliderMark } from "@chakra-ui/react";
import TrackList from "./TrackList";
import React, { useState } from "react";

interface Props {
  session: any
}

const ListTabs: React.FC<Props> = (Props) => {
  
  const timeRanges = {
    short: 'short_term',
    medium: 'medium_term',
    long: 'long_term'
  }
  const { short, medium, long } = timeRanges
  
  // implement adjustable song numbers
  // option to export playlist to account
  
  const [numTracks, setNumTracks] = useState(5)
  const sliderStyles = {
    fontSize: 'sm',
    fontWeight: 'semibold',
    color: 'purple.800'
  };
  
  
  return (
    <Tabs
      variant={"soft-rounded"}
      colorScheme={"purple"}
      align={"center"}
      size={'sm'}
    >
      <TabList>
        <Tab>one month</Tab>
        <Tab>six months</Tab>
        <Tab>all months</Tab>
      </TabList>

      <Slider
        w={"70%"}
        position={"fixed"}
        mt={4}
        mb={6}
        ml={'auto'}
        defaultValue={numTracks}
        min={5}
        max={15}
        onChange={(val) => setNumTracks(val)}
      >
        <SliderMark value={5} mt={"2"} ml={'-1'}{...sliderStyles}>5</SliderMark>
        <SliderMark value={10} mt={"2"} ml={'-2'}{...sliderStyles}>10</SliderMark>
        <SliderMark value={15} mt={"2"} ml={'-2'}{...sliderStyles}>15</SliderMark>
        <SliderTrack bgColor={"purple.100"}>
          <SliderFilledTrack bgColor={"purple.300"} />
        </SliderTrack>
        <SliderThumb bgColor={"purple.500"} w={'25px'} />
      </Slider>

      <Divider w={"80%"} />

      <TabPanels textAlign={"left"} id="convertToImage">
        <TabPanel>
          <TrackList
            session={Props.session}
            timeRange={short}
            numTracks={numTracks}
          />
        </TabPanel>
        <TabPanel>
          <TrackList
            session={Props.session}
            timeRange={medium}
            numTracks={numTracks}
          />
        </TabPanel>
        <TabPanel>
          <TrackList
            session={Props.session}
            timeRange={long}
            numTracks={numTracks}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ListTabs