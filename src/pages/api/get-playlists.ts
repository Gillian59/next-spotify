import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const cookies = new Cookies(request, response);
  const accessToken = cookies.get("spot-next");

  if (accessToken) {
    let style = "random";
    if (request.query.style) style = String(request.query.style);

    const res = await fetch(`https://api.spotify.com/v1/search?q=${style}&type=playlist&limit=5`, {
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
