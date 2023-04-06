import { Tabs, TabList, Tab, TabPanels, TabPanel, Text, Divider } from "@chakra-ui/react";
import TrackList from "./TrackList";

interface Props {
  session: any
}

const ListTabs: React.FC<Props> = (Props) => {
  
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
          <TrackList session={Props.session} timeRange="short_term" />
        </TabPanel>
        <TabPanel>
          <TrackList session={Props.session} timeRange="medium_term" />
        </TabPanel>
        <TabPanel>
          <TrackList session={Props.session} timeRange="long_term" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ListTabs