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
  const labelStyles = {
    mt: '2',
    fontSize: "md",
    ml: '-2.5',
  };
  
  
  return (
    <Tabs variant={"soft-rounded"} colorScheme={"purple"} align={"center"}>
      <TabList>
        <Tab>one month</Tab>
        <Tab>six months</Tab>
        <Tab>all months</Tab>
      </TabList>

      <Slider
        w={'300px'}
        position={'fixed'}
        mt={3}
        mb={8}
        defaultValue={48}
        min={5}
        max={150}
        onChange={(val) => setNumTracks(Math.round(val /= 10))}
      >
        <SliderMark value={1} mt={2} fontSize={'md'} ml='1.5'>
          1
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          5
        </SliderMark>
        <SliderMark value={100} {...labelStyles}>
          10
        </SliderMark>
        <SliderMark value={150} {...labelStyles}>
          15
        </SliderMark>
        <SliderTrack bgColor={"purple.100"}>
          <SliderFilledTrack bgColor={'purple.300'}/>
        </SliderTrack>
        <SliderThumb bgColor={"purple.500"} />
      </Slider>

      <Divider w={"80%"} />

      <TabPanels textAlign={'left'} ml={'10%'}>
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