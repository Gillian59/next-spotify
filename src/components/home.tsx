import React, { useState } from "react";
import PlaylistsCollection from "../components/playlists";

const Home: React.FC = () => {
  return (
    <>
      <h3>Going to Drum And Bass</h3>
      <PlaylistsCollection playlistStyle={"dnb"} />
      <h3>Forge some Metal</h3>
      <PlaylistsCollection playlistStyle={"metal"} />
      <h3>Destroy in Electro</h3>
      <PlaylistsCollection playlistStyle={"electro"} />
      <h3>Chill out with Reggae</h3>
      <PlaylistsCollection playlistStyle={"reggae"} />
      <h3>Up to be Happy</h3>
      <PlaylistsCollection playlistStyle={"happy"} />​
    </>
  );
};
export default Home;
