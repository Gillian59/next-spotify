import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { Navbar, ProgressBar } from "react-bootstrap";
import styles from "../../styles/Player.module.css";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import timeLapse from "../hooks/timeLapse";
import { SpotifyState } from "../types/spotify";

interface Props {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
  accessToken: string;
}

export const playPlaylist = (accessToken: string, playlist_id: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      context_uri: `spotify:playlist:${playlist_id}`,
    }),
  });
};

export const playAlbum = (accessToken: string, album_id: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      context_uri: `spotify:album:${album_id}`,
    }),
  });
};

export const playTrack = (accessToken: string, track_id: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: [`spotify:track:${track_id}`],
    }),
  });
};

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

export const convertMilliToMinSec = (ms: number) => {
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
  const [currentTrackArtist, setCurrentTrackArtist] = React.useState("");
  const [currentTrackCover, setCurrentTrackCover] = React.useState("");
  const [currentTrackPosition, setCurrentTrackPosition] = React.useState(0);
  const [currentTrackDuration, setCurrentTrackDuration] = React.useState(0);
  const [deviceId, player] = useSpotifyPlayer(accessToken);
  const max = timeLapse(currentTrackPosition, paused);

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      setCurrentTrackID(state.track_window.current_track.id);
      setCurrentTrack(state.track_window.current_track.name);
      setCurrentTrackArtist(state.track_window.current_track.artists[0].name);
      setCurrentTrackCover(state.track_window.current_track.album.images[0].url);
      setCurrentTrackDuration(state.duration);
      setCurrentTrackPosition(state.position);
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
            <Navbar.Text>
              Artiste : {currentTrackArtist} <br /> Titre : {currentTrack}
            </Navbar.Text>
          </div>
          <div className={"row col-6 " + styles.controls}>
            <div className={"col-12"}>
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
            </div>
            <div className={"col-12"}>
              <Navbar.Text className={styles.duration}>{convertMilliToMinSec(max)}</Navbar.Text>
              <ProgressBar className={styles.timebar} now={(max / currentTrackDuration) * 100} />;
              <Navbar.Text className={styles.duration}>{convertMilliToMinSec(currentTrackDuration)}</Navbar.Text>
            </div>
          </div>
        </>
      ) : null}
    </Navbar>
  );
};

export default Player;
