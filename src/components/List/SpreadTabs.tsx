import {
  Tabs,
  Separator,
  List,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatArtist, formatDuration } from "@/helpers";
import { maxNumTracks } from "@/globals";
import queryString from "query-string";
import SpreadCard from "./SpreadCard";
import { cardBorderRadius } from "@/globals";

type ListTabProps = {
  session: any;
  numTracksToDisplay: number;
};

type RawTrackData = {
  name: string;
  artists: Object[];
  duration_ms: number;
  album: { name: string };
  external_urls: { spotify: string };
};

export type FormattedTrack = {
  songDuration: string;
  artistNames: string;
  songName: string;
  songLink: string;
  albumName: string;
  listNumber: number;
  initial: object;
};

const TIME_RANGES = ["short_term", "medium_term", "long_term"] as const;

const TAB_LABEL: Record<(typeof TIME_RANGES)[number], string> = {
  short_term: "1-month",
  medium_term: "6-months",
  long_term: "all-time",
};

const SpreadTabs: React.FC<ListTabProps> = ({
  session,
  numTracksToDisplay,
}) => {
  const username = session?.token.username || session?.token.name;

  const songNumLimit = maxNumTracks;

  const [trackData, setTrackData] = useState({
    short_term: [],
    medium_term: [],
    long_term: [],
  });

  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${session?.token.access_token}` },
    };
    TIME_RANGES.forEach((range) => {
      const url =
        "https://api.spotify.com/v1/me/top/tracks?" +
        queryString.stringify({ time_range: range, limit: songNumLimit });

      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.items) {
            return res.items.map((item: RawTrackData, i: number) => ({
              songName: item.name,
              songLink: item.external_urls.spotify,
              songDuration: formatDuration(item.duration_ms),
              artistNames: formatArtist(item.artists),
              albumName: item.album.name,
              listNumber: i + 1,
            }));
          } else {
            return [];
          }
        })
        .then((formattedTracks: FormattedTrack[]) => {
          setTrackData((prev) => ({
            ...prev,
            [range]: formattedTracks,
          }));
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Container mx={2}>
      <Tabs.Root
        defaultValue="short_term"
        variant="subtle"
        colorPalette="purple"
        size="sm"
        lazyMount
      >
        <Tabs.List w="max-content" mx="auto" borderBottom="none">
          {TIME_RANGES.map((range) => (
            <Tabs.Trigger key={range} value={range}>
              {TAB_LABEL[range]}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Separator my={2} w="80%" mx="auto" />

        <Container
          id="tabDownload"
          px={0}
          bgColor="whiteAlpha.300"
          minW="80%"
          borderBottom="6px solid rgba(0, 0, 0, 0.3)"
          borderBottomRadius={cardBorderRadius}
          borderLeft="1px solid rgba(0, 0, 0, 0.3)"
          borderLeftRadius="24px"
          borderRight="1px solid rgba(0, 0, 0, 0.3)"
          borderRightRadius="24px"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(100, 100, 100, 0.1) 0%, rgba(0, 0, 0, 0))",
          }}
        >
          <div
            style={{
              border: "1px solid white",
              borderRadius: cardBorderRadius,
              backgroundImage: "url(/noise.png)",
              backgroundSize: "contain",
            }}
          >
            {TIME_RANGES.map((range) => (
              <Tabs.Content key={range} value={range} p={4}>
                <List.Root listStyle="none">
                  <SpreadCard
                    username={username}
                    timeRange={range}
                    numTracksToDisplay={numTracksToDisplay}
                    songlist={trackData[range as keyof typeof trackData]}
                  />
                </List.Root>
              </Tabs.Content>
            ))}
          </div>
        </Container>
      </Tabs.Root>
    </Container>
  );
};

export default SpreadTabs;
