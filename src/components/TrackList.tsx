import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import queryString from "query-string";
import { formatDuration } from "@/helpers";
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Flex, Center, Image } from "@chakra-ui/react";

interface Props {
  session: {
    token: {
      name?: string
      email: string
      picture?: string
      accessToken?: string
    }
  }
}

interface Track {
  name: String
  duration_ms: number
  album: {
    artists: [{
      name: String
    }]
    name: String
  }
}

interface Tracks extends Array<Track>{}


const TrackList: React.FC<Props> = (Props) => {
  const [tracks, setTracks] = useState<Tracks>();
  const [timeRange, setTimeRange] = useState('short_term')
  const [songLimit, setSongLimit] = useState(5)
  
  

  const url = "https://api.spotify.com/v1/me/top/tracks?" +
    queryString.stringify({
      time_range: timeRange,
      limit: songLimit,
    });
  const options = {
    headers: { Authorization: `Bearer ${Props.session?.token.accessToken}` },
  };
  
  
  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(res => { setTracks(res.items) })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const { name, email, picture } = Props.session.token
  
  const ListItems = () => {
    console.log(tracks)
    return <>
        <ListItem>{name}</ListItem>
        <ListItem>{email}</ListItem>
        {
        tracks?.map((track, i) => {
          const songDuration = formatDuration(track.duration_ms)
          const songName = track.name
          const artistName = track.album.artists[0].name
          const albumName = track.album.name
          return <ListItem  key={i}>{songName} ({songDuration}) by {artistName}  |  album: {albumName}</ListItem>
        })
      }
    </>
  }
  
  return (
    <UnorderedList spacing={'10px'} styleType={'none'}>
      <ListItems/>
      <ListItem><Image src={picture} alt="profile picture" /></ListItem>
      <ListItem>
        <a href="#" onClick={() => signOut()}>
          sign out
        </a>
      </ListItem>
    </UnorderedList>
  );
};

export default TrackList;
