import React, { useState } from "react";
import PlaylistsCollection from "../components/playlists";

type Props = {
  accessToken: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setContext_id: React.Dispatch<React.SetStateAction<string>>;
};
const Home: React.FC<Props> = ({ accessToken, setPage, setContext_id }) => {
  return (
    <>
      <h1>Welcome little listener</h1>
      <h3>Going to Drum And Bass</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"dnb"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
      <h3>Forge some Metal</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"metal"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
      <h3>Destroy in Electro</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"electro"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
      <h3>Chill out with Reggae</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"reggae"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
      <h3>Up to be Happy</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"happy"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
      <h3>Just heard a Bang ...</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"Bang"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
      <h3>Crazy banjo</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"Crazy banjo"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
      <h3>Did you know Pacman ?</h3>
      <PlaylistsCollection
        accessToken={accessToken}
        playlistStyle={"Pacman"}
        setPage={setPage}
        setContext_id={setContext_id}
      />
    </>
  );
};
export default Home;
