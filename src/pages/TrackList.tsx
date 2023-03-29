import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import queryString from "query-string";
import { formatDuration } from "@/helpers";

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
    headers: { Authorization: `Bearer ${Props.session.token?.accessToken}` },
  };
  
  
  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(res => { setTracks(res.items) })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const { name, email, picture } = Props.session.token
  
  const ListItems = () => {
    if (tracks) { 
      console.log(tracks)
      return <>{
        tracks.map((track, i) => {
          const songDuration = formatDuration(track.duration_ms)
          const songName = track.name
          const artistName = track.album.artists[0].name
          const albumName = track.album.name
          return <li key={i}>{songName} ({songDuration}) by {artistName}  |  album: {albumName}</li>
        })
      }</>
    }
  }
  
  return (
    <div>
      <h1>Swaggg</h1>
      <ul>
        <ListItems/>
        <li>{name}</li>
        <li>{email}</li>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <li><img src={picture} alt="profile picture" /></li>
        <li>
          <a href="#" onClick={() => signOut()}>
            sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TrackList;
