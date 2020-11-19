import React from "react";
import Head from "next/head";
import Sidebar from "./sidebar";
import Player from "./footer_player";
import useSWR from "swr";
import styles from "../../styles/Layout.module.css";
type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};
export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl, setPage }) => {
  const { data } = useSWR("/api/get-cookies");
  const accessToken = data;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="bkwiet corp icon" href="favicon.png" type="image/x-icon" />
        <script src="https://kit.fontawesome.com/95a069202e.js" crossOrigin="anonymous"></script>
      </Head>
      <div className={"flex-row justify-content-start " + (isLoggedIn ? styles.layout : styles.login)}>
        <Sidebar isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} setPage={setPage} />

        <main className={" " + styles.main}>{children}</main>
        {isLoggedIn ? <Player accessToken={accessToken} isLoggedIn={isLoggedIn} /> : null}
      </div>
    </>
  );
};
