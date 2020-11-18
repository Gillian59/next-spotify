import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const cookies = new Cookies(request, response);
  const accessToken = cookies.get("spot-next");
  if (accessToken) {
    response.json(JSON.stringify(accessToken));
  } else {
    response.statusCode = 500;
    response.end();
  }
};
