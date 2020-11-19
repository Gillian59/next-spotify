import React from "react";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "./sidebar";
import Player from "./player";
import useSWR from "swr";
import styles from "../../styles/Layout.module.css";

export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl }) => {
  const { data, error } = useSWR("/api/get-cookies");
  console.log("print Layout data : ", error);
  const accessToken = data;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="bkwiet corp icon" href="favicon.png" type="image/x-icon" />
        <script src="https://kit.fontawesome.com/95a069202e.js" crossOrigin="anonymous"></script>
      </Head>
      <div className={"flex-row justify-content-start " + isLoggedIn ? styles.layout : styles.login}>
        <Sidebar isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />

        <main className={" " + styles.main}>{children}</main>
        <Player accessToken={accessToken} isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
};
