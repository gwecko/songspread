import React from "react";
import { Box, Collapse, Container, Fade, Image, List, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import LoadingSkeleton from "../LoadingSkeleton";
import SpreadHeader from "./SpreadHeader";
import SongItem from "./SongItem";
import { FormattedTrack } from "./SpreadTabs";
import { createKey } from "next/dist/shared/lib/router/router";

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
    <Container fontSize={["sm", "md"]} maxW={"md"} px={1}>
      <SpreadHeader username={username} timeRange={timeRange} />
      <List spacing={1}>
        {songlist
          // .slice(0, numTracksToDisplay)
          .map((song, index) => (
            <Collapse key={song.songName} in={index < numTracksToDisplay} style={{overflow: 'visible'}}>
              <SongItem {...song} />
            </Collapse>
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
