// Keep in mind that this has been make from studying a console.log output

//import { ExecFileOptionsWithStringEncoding, SpawnSyncOptionsWithStringEncoding } from "child_process";
//import { type } from "os";

// Don't put too much faith in it
export type CategoriesItem = {
  href: string;
  icons: {
    height: number;
    url: string;
    width: number;
  }[];
  id: string;
  name: string;
};
type SpotifyTrack = {
  id: string;
  uri: string;
  type: "track" | "album" | "artist" | "user";
  linked_from_uri: any;
  linked_from: {
    uri: string | null;
    id: string | null;
  };
  media_type: string;
  name: string;
  duration_ms: number;
  artists: {
    name: string;
    uri: string;
  }[];
  album: {
    uri: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
};

type spotifyArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}[];

export type SpotifyAlbum = {
  artists: spotifyArtist;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type SpotifyState = {
  context: {
    uri: string | null;
    metadata: any;
  };
  bitrate: number;
  position: number;
  duration: number;
  paused: boolean;
  shuffle: boolean;
  repeat_mode: number;
  track_window: {
    current_track: SpotifyTrack;
    next_tracks: SpotifyTrack[];
    previous_tracks: SpotifyTrack[];
  };
  timestamp: number;
  restrictions: {
    disallow_pausing_reasons: string[];
    disallow_skipping_prev_reasons: string[];
  };
  disallows: {
    pausing: boolean;
    skipping_prev: boolean;
  };
};
export type SpotifyUser = {
  accessToken: string;
  display_name: string;
  email?: string;
  explicit_content?: Record<string, unknown>;
  external_urls?: Record<string, unknown>;
  followers?: Record<string, unknown>;
  href?: string;
  id?: string;
  images?: Record<string, unknown>[];
  product?: string;
  type?: string;
  uri?: string;
};

export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: string;
  snapshot_id: string;
  tracks: {
    href: string;
    total: 50;
  };
  type: string;
  uri: string;
};

export type SpotifySearch = {
  href: string;
  items: SpotifyPlaylist[] | SpotifyTrack[];
  limit: number;
  next: string;
  offset: 0;
  previous: string;
  total: number;
};

export type artist = {
  href: string;
  items: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }[];
};

export type track = {
  href: string;
  items: {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };

    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];

    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  }[];
};
export type album = {
  href: string;
  items: {
    album_type: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: numbert;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }[];
};
