import React from "react";
import Link from "next/link";
import { CategoriesItem } from "../types/spotify";
const CategoryList: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  console.log("ici");
  //  console.log({ categories_items });
  const [categories, setCategories] = React.useState<CategoriesItem[]>([]);
  React.useEffect(() => {
    const getCategories = async () => {
      let req = "https://api.spotify.com/v1/browse/categories";
      console.log(req);
      while (req !== null) {
        console.log(req);
        const response = await fetch(req, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        req = data.categories.next;
        data.categories.items.forEach((item: any) => {
          setCategories([...categories, item]);
        });
        console.log("avant");
        console.log(categories);
      }
    };
    getCategories();
  }, [categories]);
  return (
    <div>
      {categories.map((elt) => {
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
export default CategoryList;
