import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Parcourir: React.FC = () => {
  const router = useRouter();
  return (
    <div className="parcourir">
      <div>
        <Link href="/" passHref>
          <span className={router.pathname === "/" ? "active" : "link"}>Playlist</span>
        </Link>
      </div>
      <div>
        <Link href="/rechercher" passHref>
          <span className={router.pathname === "/parcourir" ? "active" : "link"}>Podcast</span>
        </Link>
      </div>
      <div>
        <Link href="/bibliothèque" passHref>
          <span className={router.pathname === "/radio" ? "active" : "link"}>Artiste</span>
        </Link>
      </div>
      <div>
        <Link href="/bibliothèque" passHref>
          <span className={router.pathname === "/radio" ? "active" : "link"}>Album</span>
        </Link>
      </div>
    </div>
  );
};

export default Parcourir;
