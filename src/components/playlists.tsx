import React from "react";
import useSWR from "swr";
import { SpotifyPlaylist } from "../types/spotify";
import styles from "../../styles/Playlists.module.css";
import Link from "next/link";
import { Card } from "react-bootstrap";

type PlaylistStyle = {
  playlistStyle: string;
};

const PlaylistsCollection: React.FC<PlaylistStyle> = ({ playlistStyle }) => {
  const { data, error } = useSWR("/api/get-playlists?style=" + playlistStyle);

  if (error) return <div>failed to load playlist</div>;
  if (!data) return <div>loading playlist...</div>;

  const playlists: SpotifyPlaylist[] = data.playlists.items;
  return (
    <div className="row mt-3 collection">
      {playlists.map((playlist) => {
        return (
          <Link key={playlist.id} href={`/playlist/${playlist.id}`} passHref>
            <Card className={styles.card + " col-12 col-md-3 col-lg-2 mx-2 mt-3"} title={playlist.name}>
              <Card.Img className={styles.card_img + " img-fluid"} src={playlist.images[0].url} alt="Card image cap" />
              <Card.Body>
                <Card.Title className="title text-truncate" style={{ fontSize: "medium" }}>
                  {playlist.name}
                </Card.Title>
                <Card.Text className="text-truncate" style={{ fontSize: "small" }}>
                  {playlist.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default PlaylistsCollection;
