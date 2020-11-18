import React from "react";
import Link from "next/link";
import { CategoriesItem } from "../types/spotify";
const CategoryList: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  console.log("ici");
  //  console.log({ categories_items });
  const [categories, setCategories] = React.useState<CategoriesItem[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const getCategories = async () => {
    let req = "https://api.spotify.com/v1/browse/categories";
    console.log(req);
    const arrayCategories: CategoriesItem[] = [];
    while (req !== null) {
      console.log(req);
      const response = await fetch(req, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      data.categories.items.forEach((item: any) => {
        arrayCategories.push(item);
        setCategories(arrayCategories);
      });
      req = data.categories.next;
    }
    setLoaded(true);
  };
  React.useEffect(() => {
    getCategories();
  }, [loaded]);
  return (
    <div>
      {/* {setLoaded(false)} */}
      {categories.map((elt, id) => {
        return (
          <div key={elt.id + "_" + id}>
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
