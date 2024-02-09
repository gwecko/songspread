import React from "react";
import { Box, Container, Image, List } from "@chakra-ui/react";
import LoadingSkeleton from "../LoadingSkeleton";
import SpreadHeader from "./SpreadHeader";
import SongItem from "./SongItem";
import { FormattedTrack } from "./SpreadTabs";

type SpreadCardProps = {
  username: string;
  timeRange: string;
  numTracksToDisplay: number;
  songlist: FormattedTrack[];
};


const songNumLimit = 12;

const SpreadCard: React.FC<SpreadCardProps> = ({
  username,
  timeRange,
  numTracksToDisplay,
  songlist,
}) => {

  return songlist.length ? (
    <Container fontSize={["sm", "md"]} maxW={'md'} px={1}>
      <SpreadHeader username={username} timeRange={timeRange} />
      <List spacing={1}>
        {songlist.slice(0, numTracksToDisplay).map((song, index) => (
          <SongItem key={index} {...song} />
        ))}
      </List>
      <Box my={2}>
        <Image
          src="/SpotifyLogoWhite.png"
          alt="white spotify logo"
          width={"70px"}
          mx={"auto"}
        />
      </Box>
    </Container>
  ) : (
    <Container w={"100%"} ml={"-0.5em"}>
      <LoadingSkeleton
        maxLength={songNumLimit}
        displayLength={numTracksToDisplay}
      />
    </Container>
  );
};

export default SpreadCard;
