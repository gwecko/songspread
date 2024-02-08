import React from "react";
import { Box, Link, Text, Image, List } from "@chakra-ui/react";
import LoadingSkeleton from "../LoadingSkeleton";
import SpreadHeader from "./SpreadHeader";
import SongItem from "./SongItem";

type SpreadCardProps = {
  username: string;
  timeRange: string;
  numTracksToDisplay: number;
  songlist: Object[];
};

const songNumLimit = 12;

const SpreadCard: React.FC<SpreadCardProps> = ({
  username,
  timeRange,
  numTracksToDisplay,
  songlist,
}) => {

  return songlist.length ? (
    <Box fontSize={["sm", "md"]}>
      <SpreadHeader username={username} timeRange={timeRange} />
      <List>
        {songlist.slice(0, numTracksToDisplay).map((item, index) => (
          <SongItem key={index} {...item} />
        ))}
      </List>
      <Box display={"flex"} my={"4px"}>
        <Image
          src="/SpotifyLogoWhite.png"
          alt="white spotify logo"
          width={"70px"}
          mx={"auto"}
        />
      </Box>
    </Box>
  ) : (
    <Box w={"100%"} ml={"-0.5em"}>
      <LoadingSkeleton
        maxLength={songNumLimit}
        displayLength={numTracksToDisplay}
      />
    </Box>
  );
};

export default SpreadCard;
