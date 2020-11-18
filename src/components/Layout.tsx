import React from "react";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "./sidebar";
import Player from "./player";
import styles from "../../styles/Layout.module.css";

export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://kit.fontawesome.com/95a069202e.js" crossOrigin="anonymous"></script>
      </Head>
      <div className={"flex-row justify-content-start " + styles.layout}>
        <Sidebar isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />

        <main className={" " + styles.main}>{children}</main>
        <Player isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />
      </div>
    </>
  );
};
