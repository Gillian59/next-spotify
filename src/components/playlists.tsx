import React from "react";
import useSWR from "swr";
import { SpotifyPlaylists } from "../types/spotify";
import styles from "../styles/Playlists.module.css";
import Link from "next/link";

const PlaylistsCollection: React.FC = () => {
  const { data, error } = useSWR("/api/get-playlists");

  if (error) return <div>failed to load playlist</div>;
  if (!data) return <div>loading playlist...</div>;

  const playlists: SpotifyPlaylists = data.playlists;
  return (
    <div className="row">
      {playlists.items.map((playlist, id) => {
        return (
          <Link key={id} href="#" passHref>
            <div className={styles.card + " col-12 col-md-3 col-lg-2 mx-2 mt-3"} title={playlist.name}>
              <div className="">
                <div className="card-body">
                  <img
                    className={styles.card_img_top + " card-img-top mt-2"}
                    src={playlist.images[0].url}
                    alt="Card image cap"
                  />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PlaylistsCollection;
