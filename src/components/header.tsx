import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Header = () => {
  const router = useRouter();
  // const styles= {
  //   header:{

  //   }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <div>
      <div className="header">
        <img className="logo" src="logo.png" alt="logo spotify" />

        <div className="liens">
          <Link href="/" passHref>
            <span className={router.pathname === "/" ? "active" : "link"}>Accueil</span>
          </Link>
        </div>
        <div className="liens">
          <Link href="/rechercher" passHref>
            <span className={router.pathname === "/parcourir" ? "active" : "link"}>Rechercher</span>
          </Link>
        </div>
        <div className="liens">
          <Link href="/bibliothèque" passHref>
            <span className={router.pathname === "/radio" ? "active" : "link"}>Bibliothèque</span>
          </Link>
        </div>
        <div className="liens">
          <Link href="/bibliothèque" passHref>
            <span className={router.pathname === "/radio" ? "active" : "link"}>PLAYLISTS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
