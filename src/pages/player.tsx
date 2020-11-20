import { NextPage, GetServerSidePropsContext } from "next";
import Cookies from "cookies";
import useSWR from "swr";
import React, { useState } from "react";
import { SpotifyState, SpotifyUser } from "../types/spotify";
import { Layout } from "../components/Layout";
import FormSearch from "../components/search";
import Home from "../components/home";
import Show_Playlist from "../components/show_playlist";

interface Props {
  user: SpotifyUser;
  accessToken: string;
}
const play = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: ["spotify:track:1lCRw5FEZ1gPDNPzy1K4zW"],
    }),
  });
};
const pause = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const Player: NextPage<Props> = ({ accessToken }) => {
  const { data, error } = useSWR("/api/get-user-info");
  const [page, setPage] = useState("home");
  const [context_id, setContext_id] = useState("dnb971X:FF:AA:11:EB");

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const user = data;
  return (
    <Layout isLoggedIn={true} setPage={setPage}>
      {page === "home" && <Home accessToken={accessToken} setPage={setPage} setContext_id={setContext_id} />}
      {page === "search" && <FormSearch accessToken={accessToken} />}
      {page === "playlist" && <Show_Playlist accessToken={accessToken} context_id={context_id} />}​
    </Layout>
  );
};
export default Player;
export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<unknown> => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("spot-next");
  if (accessToken) {
    return { props: { accessToken } };
  } else {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
