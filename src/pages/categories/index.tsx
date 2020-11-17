import { GetServerSideProps } from "next";
import React from "react";
import Link from "next/link";
import Cookies from "cookies";

const getCategories: React.FC<{ categories_items: any[] }> = ({ categories_items }) => {
  console.log("ici");
  //  console.log({ categories_items });

  return (
    <div>
      {categories_items.map((elt) => {
        return (
          <div key={elt.name}>
            <Link href={`/categories/${elt.id}`}>
              <div>
                <p> {elt.name}</p>
                {elt.icons.length > 0 ? <img src={elt.icons[0].url} alt={elt.name}></img> : null}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default getCategories;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("spot-next");
  const dataG: any = [];
  if (accessToken) {
    let req = "https://api.spotify.com/v1/browse/categories";
    //    console.log(req);
    while (req !== null) {
      console.log(req);
      const response = await fetch(req, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      console.log(data.playlists);
      req = data.categories.next;
      data.categories.items.forEach((items: any) => dataG.push(items));
    }

    //    console.log(dataG);
    return {
      props: {
        categories_items: dataG,
      },
    };
  } else {
    //    console.log("vide");
    return {
      props: {
        categories_items: {},
      },
    };
  }
};
