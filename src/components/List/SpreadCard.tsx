import React from "react";
import {
  Box,
  Collapsible,
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
  return (
    <Stack fontSize={["sm", "md"]} maxW="md" gap={5}>
      <SpreadHeader username={username} timeRange={timeRange} />
      {songlist.length ? (
        <List.Root gap="0.8em" mt={1} listStyle="none">
          {songlist.map((song, index) => (
            <Collapsible.Root
              key={song.songName}
              open={index < numTracksToDisplay}
            >
              <Collapsible.Content style={{ overflow: "visible" }}>
                <SongItem {...song} />
              </Collapsible.Content>
            </Collapsible.Root>
          ))}
        </List.Root>
      ) : (
        <LoadingSkeleton
          maxLength={songNumLimit}
          displayLength={numTracksToDisplay}
        />
      )}
      <Box display="inline-flex" justifyContent="space-between">
        <Image
          src="/SpotifyLogoWhite.png"
          alt="white spotify logo"
          w="80px"
        />
        <Text
          display="inline-block"
          fontSize="smaller"
          fontWeight="500"
          color="white"
          mr={1}
        >
          songspread.app
        </Text>
      </Box>
    </Stack>
  );
};

export default SpreadCard;
