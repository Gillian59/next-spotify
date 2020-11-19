import React, { useState } from "react";
import PlaylistsCollection from "../components/playlists";

const Home: React.FC = () => {
  return (
    <>
      <h1>Welcome little listener</h1>
      <h3>Going to Drum And Bass</h3>
      <PlaylistsCollection playlistStyle={"dnb"} />
      <h3>Forge some Metal</h3>
      <PlaylistsCollection playlistStyle={"metal"} />
      <h3>Destroy in Electro</h3>
      <PlaylistsCollection playlistStyle={"electro"} />
      <h3>Chill out with Reggae</h3>
      <PlaylistsCollection playlistStyle={"reggae"} />
      <h3>Up to be Happy</h3>
      <PlaylistsCollection playlistStyle={"happy"} />
      <h3>Just heard a Bang ...</h3>
      <PlaylistsCollection playlistStyle={"Bang"} />
      <h3>Crazy banjo</h3>
      <PlaylistsCollection playlistStyle={"Crazy banjo"} />
      <h3>Did you know Pacman ?</h3>
      <PlaylistsCollection playlistStyle={"Pacman"} />
    </>
  );
};
export default Home;
