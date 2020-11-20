import React from "react";
import useSWR from "swr";
import { Jumbotron, Table } from "react-bootstrap";
import { SpotifyPlaylist } from "../types/spotify";
import styles from "../../styles/show_tracks.module.css";
import { convertMilliToMinSec, playTrack } from "./footer_player";
type Props = {
  context_id: string;
  accessToken: string;
};

const Show_Playlist: React.FC<Props> = ({ context_id, accessToken }) => {
  const { data, error } = useSWR("/api/get-playlist?playlist_id=" + context_id);

  if (error) return <div>failed to load playlist</div>;
  if (!data) return <div>loading playlist...</div>;

  const playlist: SpotifyPlaylist = data;
  console.log(playlist);
  return (
    <>
      <Jumbotron className={"row " + styles.jumbo}>
        <img className={"col-3"} src={playlist.images[0].url} alt="playlist_image" />
        <div className={"col-8"}>
          <h1>{playlist.name}</h1>
          <p>{playlist.description}</p>
          <p>Total de tracks : {playlist.tracks.total}</p>
        </div>
      </Jumbotron>

      <Table className={styles.table} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Album</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {playlist.tracks.items.map((track, id) => {
            return (
              <tr
                key={track.track.id}
                onClick={() => {
                  playTrack(accessToken, track.track.id);
                }}
              >
                <td>{id + 1}</td>
                <td>
                  {track.track.name} <br /> {track.track.artists[0].name}
                </td>
                <td>{track.track.album.name}</td>
                <td> {convertMilliToMinSec(track.track.duration_ms)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Show_Playlist;
