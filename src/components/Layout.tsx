import React from "react";
import Head from "next/head";
import LeftBloc from "../components/leftBloc";
import { Header } from "./header";
import Radio from "../pages/radio";
import Link from "next/link";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};

const NavBar: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  return (
    <div className="NavBar">
      {isLoggedIn ? (
        <>
          <div className="lie">
            <Link href="/api/logout">
              <span>logout</span>
            </Link>
          </div>
        </>
      ) : (
        <div className="lie">
          <Link href={spotifyLoginUrl}>
            <span>login</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />
      <Header />
      <Radio />
      <LeftBloc />

      <main>{children}</main>
    </>
  );
};
