import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { Navbar } from "react-bootstrap";
import styles from "../../styles/Player.module.css";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import { SpotifyState } from "../types/spotify";

interface Props {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
  accessToken: string;
}

const play = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: ["spotify:album:2W2nqEKXWBorbq5yvm3jZg:tracks"],
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

const resume = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const previous = (accessToken: string, deviceId: string) => {
  console.log("Fonction player : Previous");
  return fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const next = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const Player: React.FC<Props> = ({ accessToken, isLoggedIn }) => {
  const [paused, setPaused] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState("");
  const [deviceId, player] = useSpotifyPlayer(accessToken);

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      setCurrentTrack(state.track_window.current_track.name);
    };
    if (player) {
      player.addListener("player_state_changed", playerStateChanged);
    }
    return () => {
      if (player) {
        player.removeListener("player_state_changed", playerStateChanged);
      }
    };
  }, [player]);

  return (
    <Navbar className={"row " + styles.player} fixed="bottom">
      {isLoggedIn ? (
        <>
          <div className={"ml-3 mr-3 col-3 " + styles.informations}>
            <Navbar.Text>{currentTrack}</Navbar.Text>
          </div>
          <div className={" col-3" + styles.controls}>
            <Navbar.Text>
              <i className="fas fa-random"></i>
            </Navbar.Text>

            <Navbar.Text
              onClick={() => {
                previous(accessToken, deviceId);
              }}
            >
              <i className="fas fa-fast-backward"></i>
            </Navbar.Text>

            <Navbar.Text
              onClick={() => {
                paused ? play(accessToken, deviceId) : pause(accessToken, deviceId);
              }}
            >
              {paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause-circle"></i>}
            </Navbar.Text>

            <Navbar.Text
              onClick={() => {
                next(accessToken, deviceId);
              }}
            >
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
