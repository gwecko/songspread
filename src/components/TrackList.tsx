import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { formatDuration, formatArtist } from "@/helpers";
import {
  List,
  ListItem,
  UnorderedList,
  Image,
  Skeleton,
  Box,
  Stack,
  Spinner,
  Link,
  Slide,
  useDisclosure,
  SlideFade,
  ScaleFade,
  Collapse,
  Fade,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";

interface Props {
  numTracksToDisplay: number;
  timeRange?: string;
  session: {
    token: {
      name?: string;
      email: string;
      picture?: string;
      accessToken?: string;
    };
  };
}

interface FetchedTrack {
  name: string;
  artists: Object[];
  duration_ms: number;
  album: { name: string };
  external_urls: { spotify: string };
}

type Track = {
  songDuration: string,
  artistNames: string,
  songName: string,
  songLink: string,
  albumName: string,
  number: number,
  isDisplayed: boolean,
}

const TrackList: React.FC<Props> = (Props) => {
  const { timeRange, numTracksToDisplay } = Props;
  const [listLength, setListLength] = useState(numTracksToDisplay)
  const [allTracks, setAllTracks] = useState<ReactNode[] | undefined>(undefined);
  const [displayedTracks, setDisplayedTracks] = useState([...Array(15)])
  
  // get data from spotify on page load
  const url = "https://api.spotify.com/v1/me/top/tracks?" + queryString.stringify({
    time_range: timeRange,
    limit: 15,
  });
  const options = {
    headers: { Authorization: `Bearer ${Props.session?.token.accessToken}` },
  };
  
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        // Array of object data formatted to what I want
        const tracks: Track[] = res.items.map((item: FetchedTrack, i: number) => {
          return {
            songDuration: formatDuration(item.duration_ms),
            artistNames: formatArtist(item.artists),
            songName: item.name,
            songLink: item.external_urls.spotify,
            albumName: item.album.name,
            number: i + 1,
            isDisplayed: i < numTracksToDisplay,
          }
        })
        
        // Array of track JSX
        const tracksJSX = tracks.map((track, i) => (
            <Item key={i} {...track} />
        ))
        setAllTracks(tracksJSX)
        setDisplayedTracks(tracksJSX.slice(0, listLength))
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (displayedTracks.length < numTracksToDisplay) {
      displayedTracks.push(allTracks?.at(listLength))
      setDisplayedTracks(displayedTracks)
    } else if (displayedTracks.length > numTracksToDisplay) {
      displayedTracks.pop()
      setDisplayedTracks(displayedTracks)
    }
  }, [listLength, allTracks, displayedTracks, numTracksToDisplay])
  
  
  const Items = () => {
    return (
      <AnimatePresence>
        {displayedTracks}
      </AnimatePresence>
    )
  };
  
  const Item = ({ songLink, songName, artistNames, number }: Track) => {
    const isPresent = useIsPresent();
    
    const animations = {
      initial: { scale: .8, opacity: .5 },
      animate: { scale: 1, opacity: 1 }, 
      exit: { scale: 0, opacity: 0 }
    }

    return (
      <motion.h2 {...animations} layout>
        <Link href={songLink} _hover={{ textDecoration: "none" }} isExternal>
          {number}. {songName} - {artistNames}
        </Link>
      </motion.h2>
    );
  };
  

  return (
    allTracks !== undefined ? (
      <Box
        fontSize={["sm", "md"]}
        w={"80%"}
        margin={"auto"}
        flexWrap={'wrap'}
      >
        <Items />
      </Box>
    ) : (
      <Spinner color="purple.400" size="xl" thickness=".6em" />
    )
  );
};

export default TrackList;



{/* <UnorderedList
          spacing={".5em"}
          styleType={"none"}
          fontSize={["sm", "md"]}
>
</UnorderedList> */}


{/* <ListItem key={i}>
          <Link
            href={songLink}
            _hover={{ textDecoration: "none" }}
            isExternal
          >
            {i + 1}. {songName} - {artistNames}
          </Link>
        </ListItem> */}