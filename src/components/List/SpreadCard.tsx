import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Container,
  Flex,
  Image,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import LoadingSkeleton from "../LoadingSkeleton";
import SpreadHeader from "./SpreadHeader";
import SongItem from "./SongItem";
import { FormattedTrack } from "./SpreadTabs";
import { maxNumTracks } from "@/globals";

type SpreadCardProps = {
  username?: string | undefined;
  timeRange: string;
  numTracksToDisplay: number;
  songlist: FormattedTrack[];
};

const songNumLimit = maxNumTracks;


const SpreadCard: React.FC<SpreadCardProps> = ({
  username,
  timeRange,
  numTracksToDisplay,
  songlist,
}) => {
  
const [songspread, setSongspread] = useState<FormattedTrack[]>(songlist);
  useEffect(() => {
    setSongspread(songlist);
  }, [songlist]);

  return (
    <Stack fontSize={["sm", "md"]} maxW={"md"} spacing={5}>
      <SpreadHeader username={username} timeRange={timeRange} />
      {songlist.length ? (
        <List spacing={"0.8em"} mt={1}>
          {songspread
            .map((song, index) => (
              <Collapse
                key={song.songName}
                in={index < numTracksToDisplay}
                style={{ overflow: "visible" }}
              >
                <SongItem {...song} />
              </Collapse>
            ))}
        </List>
      ) : (
        <LoadingSkeleton
          maxLength={songNumLimit}
          displayLength={numTracksToDisplay}
        />
      )}
      <Box display={"inline-flex"} justifyContent={"space-between"}>
        <Image
          src="/SpotifyLogoWhite.png"
          alt="white spotify logo"
          w={"80px"}
        />
        <Text
          display={"inline-block"}
          fontSize={"smaller"}
          fontWeight={"500"}
          color={"white"}
          mr={1}
        >
          songspread.app
        </Text>
      </Box>
    </Stack>
  );
};

export default SpreadCard;
