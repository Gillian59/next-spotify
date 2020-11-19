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
      context_uri: "spotify:playlist:37i9dQZF1DX8pxtTvJ2V4V",
    }),
  });
};

// uris: ["spotify:track:" + track_id],
//       position_ms: position,
const resume = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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

const seek = (accessToken: string, deviceId: string, position_ms: number) => {
  return fetch(`https://api.spotify.com/v1/me/player/seek?device_id=${deviceId}&position_ms=${position_ms}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const shuffle = (accessToken: string, deviceId: string, state: boolean) => {
  return fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}&device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const repeat = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/repeat?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const convertMilliToMinSec = (ms: number) => {
  const min = Math.floor(ms / 60000);
  const sec = parseInt(((ms % 60000) / 1000).toFixed(0));
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

const Player: React.FC<Props> = ({ accessToken, isLoggedIn }) => {
  const [paused, setPaused] = React.useState(false);
  const [shuffled, setShuffled] = React.useState(false);
  const [looped, setLooped] = React.useState(false);
  const [currentTrackID, setCurrentTrackID] = React.useState("");
  const [currentTrack, setCurrentTrack] = React.useState("");
  const [currentTrackCover, setCurrentTrackCover] = React.useState("");
  const [currentTrackPosition, setCurrentTrackPosition] = React.useState(0);
  const [currentTrackLaps, setCurrentTrackLaps] = React.useState(0);
  const [currentTrackDuration, setCurrentTrackDuration] = React.useState(0);
  const [deviceId, player] = useSpotifyPlayer(accessToken);

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      setCurrentTrackID(state.track_window.current_track.id);
      setCurrentTrack(state.track_window.current_track.name);
      setCurrentTrackCover(state.track_window.current_track.album.images[0].url);
      setCurrentTrackDuration(state.duration);
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
            <img className={styles.cover} src={currentTrackCover} alt="cover track" />
            <Navbar.Text>{currentTrack}</Navbar.Text>
          </div>
          <div className={" col-3" + styles.controls}>
            <Navbar.Text
              onClick={() => {
                shuffle(accessToken, deviceId, !shuffled);
                setShuffled(!shuffled);
              }}
            >
              <i className={"fas fa-random " + (shuffled ? styles.activated_control : "")}></i>
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
                paused ? resume(accessToken, deviceId) : pause(accessToken, deviceId);
              }}
            >
              {paused ? (
                <i className="fas fa-play"></i>
              ) : (
                <i className={"fas fa-pause-circle " + styles.activated_control}></i>
              )}
            </Navbar.Text>

            <Navbar.Text
              onClick={() => {
                next(accessToken, deviceId);
              }}
            >
              <i className="fas fa-fast-forward"></i>
            </Navbar.Text>

            <Navbar.Text
              onClick={() => {
                repeat(accessToken, deviceId);
              }}
            >
              <i className="fas fa-undo"></i>
            </Navbar.Text>

            <Navbar.Text className={styles.duration}>{convertMilliToMinSec(currentTrackLaps)} </Navbar.Text>

            <Navbar.Text className={styles.duration}>{convertMilliToMinSec(currentTrackDuration)}</Navbar.Text>
          </div>
        </>
      ) : null}
    </Navbar>
  );
};

export default Player;