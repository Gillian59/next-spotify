import { GetServerSideProps } from "next";
import React from "react";
//import Link from "next/link";
import Cookies from "cookies";

/*type listCategories = {
  categories: {
    href: string;
    items: {
      href: string;
      icons: {
        height: number;
        url: string;
        width: number;
      }[];
      id: string;
      name: string;
    }[];
  };
};
*/
const getRecherche: React.FC<{ artists_items: any[] }> = ({ artists_items }) => {
  //  const [count, setCount] = React.useState(0);
  console.log("ici");
  console.log({ artists_items });

  return (
    <div>
      {artists_items.map((elt) => {
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
//            <img src={elt.images[0].url} alt={elt.name}></img>

export default getRecherche;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("spot-next");
  //  const dataG: any = [];
  if (accessToken) {
    const req = "https://api.spotify.com/v1/search?q=bruel&type=track%2Cartist&sort_by=popularity.desc";
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
    data.forEach((items: any) => console.log(typeof { items }));
    //    }

    //    console.log(dataG);
    return {
      props: {
        artists_items: data.artists.items,
      },
    };
  } else {
    //    console.log("vide");
    return {
      props: {
        artists_items: {},
      },
    };
  }
};
