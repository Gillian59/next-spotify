import React from "react";
import Link from "next/link";
import { CategoriesItem } from "../types/spotify";
import { Card } from "react-bootstrap";
import styles from "../../styles/Categories.module.css";

const CategoryList: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  console.log("ici");
  //  console.log({ categories_items });
  const [categories, setCategories] = React.useState<CategoriesItem[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [req, setReq] = React.useState("https://api.spotify.com/v1/browse/categories");

  const getCategories = async () => {
    //    let req = "https://api.spotify.com/v1/browse/categories";
    console.log(req);
    const arrayCategories: CategoriesItem[] = [];
    //    while (req !== null) {
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
    setReq(data.categories.next);
    //    }
    if (req === null) {
      setLoaded(true);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, [loaded]);
  return (
    <div className="row mt-3 collection">
      {/* {setLoaded(false)} */}
      {categories.map((elt, id) => {
        return (
          <Link key={elt.id + "_" + id} href={`/categories/${elt.id}`}>
            <Card className={styles.card + " col-12 col-md-3 col-lg-2 mx-2 mt-3"} title={elt.name}>
              {elt.icons.length > 0 ? (
                <Card.Img className={styles.card_img + " img-fluid"} src={elt.icons[0].url} alt={elt.name} />
              ) : null}
              <Card.Body>
                <Card.Title className="title text-truncate" style={{ fontSize: "medium" }}>
                  {elt.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
export default CategoryList;
