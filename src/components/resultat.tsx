import React from "react";
import { artist, album, track } from "../types/spotify.d";

type searchData = {
  artists: artist;
  tracks: track;
  albums: album;
};

const ShowResultat: React.FC<any> = ({ accessToken, texteToFind }) => {
  const [data, setData] = React.useState<searchData | null>(null);

  //  const req = "https://api.spotify.com/v1/search?q=bruel&type=track%2Cartist%2Calbum&sort_by=popularity.desc";
  const req = `https://api.spotify.com/v1/search?q=${texteToFind}&type=track%2Cartist%2Calbum&sort_by=popularity.desc`;

  React.useEffect(() => {
    console.log({ texteToFind });
    const getResultat = async () => {
      const response = await fetch(req, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    };
    getResultat().then((data) => {
      setData(data);
    });
  });
  if (data) {
    return (
      <div>
        <p> artist</p>
        {data.artists.items.map((elt: any) => {
          return (
            <div key={elt.name}>
              {elt.images.length > 0 ? <img src={elt.images[0].url} alt={elt.name}></img> : null}
              <p> {elt.name}</p>
              <p>{elt.type}</p>
            </div>
          );
        })}
        <p>Titres</p>
        {data.tracks.items.map((elt: any) => {
          return (
            <div key={elt.name}>
              {elt.album.images.length > 0 ? <img src={elt.album.images[0].url} alt={elt.name}></img> : null}
              <p> {elt.name}</p>
            </div>
          );
        })}
        <p>Albums</p>
        {data.albums.items.map((elt: any) => {
          return (
            <div key={elt.name}>
              {elt.images.length > 0 ? <img src={elt.images[0].url} alt={elt.name}></img> : null}
              <p> {elt.name}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <p>vide</p>
      </div>
    );
  }
};

export default ShowResultat;
