import { GetServerSideProps } from "next";
import React from "react";
//import Link from "next/link";
import Cookies from "cookies";

const getRecherche: React.FC<{ data: any }> = ({ data }) => {
  console.log("ici");
  console.log(data);

  return (
    <div>
      <p> artist</p>
      {data.artists.items.map((elt: any) => {
        return (
          <div key={elt.name}>
            {elt.images.length > 0 ? <img src={elt.images[0].url} alt={elt.name}></img> : null}
            <p> {elt.name}</p>
            <p>{elt.type}</p>
          </div>
        );
      })}
      <p>track</p>
      {data.tracks.items.map((elt: any) => {
        return (
          <div key={elt.name}>
            {elt.album.images.length > 0 ? <img src={elt.album.images[0].url} alt={elt.name}></img> : null}
            <p> {elt.name}</p>
            <p>{elt.type}</p>
          </div>
        );
      })}
      <p>album</p>
      {data.albums.items.map((elt: any) => {
        return (
          <div key={elt.name}>
            {elt.images.length > 0 ? <img src={elt.images[0].url} alt={elt.name}></img> : null}
            <p> {elt.name}</p>
            <p>{elt.type}</p>
          </div>
        );
      })}
    </div>
  );
};

export default getRecherche;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("spot-next");
  //  const dataG: any = [];
  if (accessToken) {
    const req = "https://api.spotify.com/v1/search?q=bruel&type=track%2Cartist%2Calbum&sort_by=popularity.desc";

    //    console.log(req);
    //    while (req !== null) {
    //      console.log(req);
    const response = await fetch(req, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    //  console.log(data.artists);
    //req = data.categories.next;
    //    }

    //    console.log(dataG);
    return {
      props: {
        data: data,
      },
    };
  } else {
    //    console.log("vide");
    return {
      props: {
        data: {},
      },
    };
  }
};
