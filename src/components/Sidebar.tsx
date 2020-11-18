import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import styles from "../../styles/Sidebar.module.css";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
};

const Sidebar: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  const { data } = useSWR("/api/get-user-info");
  const user = data;
  return (
    <Navbar className={"flex-column " + styles.sidebar} sticky="top">
      <NavbarBrand className={styles.navbrand}>
        <img src="wave.png" alt="logo_icon" className={styles.brand} /> Spot.API
      </NavbarBrand>

      {isLoggedIn ? (
        <>
          <img src="profile.png" alt="profile_icon" className={styles.profile} />
          <Navbar.Text className={styles.username}>{user && user.display_name}</Navbar.Text>
        </>
      ) : (
        <img src="mandala.png" alt="profile_icon" className={styles.profile} />
      )}
      <div className={styles.link}>
        {isLoggedIn ? (
          <>
            <Nav.Link href="#">
              <i className="fas fa-campground"></i> Home
            </Nav.Link>
            <Nav.Link eventKey="link-1">
              <i className="fas fa-search"></i> Rechercher
            </Nav.Link>
            <Nav.Link eventKey="link-2">
              <i className="fab fa-spotify"></i> Bibliothèque
            </Nav.Link>

            <hr className="dotted"></hr>
            <Navbar.Text className={styles.section}>PLAYLIST</Navbar.Text>

            <Nav.Link eventKey="link-2">
              <i className="fas fa-plus-square"></i> Créer Playlist
            </Nav.Link>

            <Nav.Link eventKey="link-2">
              <i className="fab fa-gratipay"></i> Mes Playlists
            </Nav.Link>
            <hr className="dotted"></hr>

            <Link href="/api/logout" passHref>
              <Nav.Link eventKey="link-3">
                <i className="fas fa-sign-out-alt"></i> logout
              </Nav.Link>
            </Link>
          </>
        ) : (
          <Link href={String(spotifyLoginUrl)} passHref>
            <Nav.Link eventKey="link-3">
              <i className="fas fa-sign-in-alt"></i> login
            </Nav.Link>
          </Link>
        )}
      </div>
    </Navbar>
  );
};

export default Sidebar;
