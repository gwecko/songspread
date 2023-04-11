import { Tabs, TabList, Tab, TabPanels, TabPanel, Text, Divider } from "@chakra-ui/react";
import TrackList from "./TrackList";
import React from "react";

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
  
  
  return (
    <Tabs variant={"soft-rounded"} colorScheme={"purple"} align={"center"}>
      <TabList>
        <Tab>one month</Tab>
        <Tab>six months</Tab>
        <Tab>all months</Tab>
      </TabList>
      
      <Divider pt={2} w={'80%'}/>
      
      <TabPanels>
        <TabPanel>
          <TrackList session={Props.session} timeRange={short} />
        </TabPanel>
        <TabPanel>
          <TrackList session={Props.session} timeRange={medium} />
        </TabPanel>
        <TabPanel>
          <TrackList session={Props.session} timeRange={long} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ListTabs