import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const cookies = new Cookies(request, response);
  const accessToken = cookies.get("spot-next");

  if (accessToken) {
    let album_id = "7eb9yC1hWqt3xtUmJ1gaWW"; // Yamantaka album Severed;
    if (request.query.album_id) album_id = String(request.query.album_id);

    const res = await fetch(`https://api.spotify.com/v1/albums/${album_id}/tracks`, {
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
