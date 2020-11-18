import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { Navbar } from "react-bootstrap";
import styles from "../../styles/Player.module.css";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
};

const Player: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  return (
    <Navbar className={"row " + styles.player} fixed="bottom">
      {isLoggedIn ? (
        <>
          <div className={"ml-3 mr-3 col-3 " + styles.informations}>
            <Navbar.Text>Titre de la chanson</Navbar.Text>
          </div>
          <div className={" col-3" + styles.controls}>
            <Navbar.Text>
              <i className="fas fa-random"></i>
            </Navbar.Text>
            <Navbar.Text>
              <i className="fas fa-fast-backward"></i>
            </Navbar.Text>
            <Navbar.Text>
              <i className="fas fa-play"></i>
            </Navbar.Text>
            <Navbar.Text>
              <i className="fas fa-fast-forward"></i>
            </Navbar.Text>
            <Navbar.Text>
              <i className="fas fa-undo"></i>
            </Navbar.Text>
          </div>
        </>
      ) : null}
    </Navbar>
  );
};

export default Player;
