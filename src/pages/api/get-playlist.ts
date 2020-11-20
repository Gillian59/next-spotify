import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const cookies = new Cookies(request, response);
  const accessToken = cookies.get("spot-next");

  if (accessToken) {
    let playlist_id = "37i9dQZF1E37gJ181gHh7N"; // Yamantaka album Severed;
    if (request.query.playlist_id) playlist_id = String(request.query.playlist_id);

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const body = await res.json();
    response.json(body);
  } else {
    response.statusCode = 500;
    response.end();
  }
};
