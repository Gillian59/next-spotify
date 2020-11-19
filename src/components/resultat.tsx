import React from "react";
import { artist, album, track } from "../types/spotify.d";
import { Row, Container } from "react-bootstrap";
import styles from "../../styles/SearchItems.module.css";
import { Card } from "react-bootstrap";

type searchData = {
  artists: artist;
  tracks: track;
  albums: album;
};

const ShowResultat: React.FC<any> = ({ accessToken, texteToFind }) => {
  const [data, setData] = React.useState<searchData | null>(null);

  //  const req = "https://api.spotify.com/v1/search?q=bruel&type=track%2Cartist%2Calbum&sort_by=popularity.desc";
  const req = `https://api.spotify.com/v1/search?q=${texteToFind}&type=track%2Cartist%2Calbum&sort_by=popularity.desc`;

  React.useEffect(() => {
    console.log({ texteToFind });
    const getResultat = async () => {
      const response = await fetch(req, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    };
    getResultat().then((data) => {
      setData(data);
    });
  });
  if (data) {
    return (
      <div>
        <Container>
          <div>
            <Row>
              <p> Artists</p>
              {data.artists.items.map((elt: any) => {
                return (
                  <Card className={styles.card + " col-12 col-md-3 col-lg-2 mx-2 mt-3"} key={elt.name}>
                    {elt.images.length > 0 ? (
                      <Card.Img className={styles.card_img + " img-fluid"} src={elt.images[0].url} alt={elt.name} />
                    ) : null}
                    <Card.Title className="title text-truncate" style={{ fontSize: "medium" }}>
                      {elt.name}
                    </Card.Title>
                  </Card>
                );
              })}
            </Row>
          </div>
          <Row>
            <p>Titres</p>
            {data.tracks.items.map((elt: any) => {
              return (
                <div key={elt.name}>
                  {elt.album.images.length > 0 ? <img src={elt.album.images[0].url} alt={elt.name}></img> : null}
                  <p> {elt.name}</p>
                </div>
              );
            })}
          </Row>
          <Row>
            <p>Albums</p>
            {data.albums.items.map((elt: any) => {
              return (
                <div key={elt.name}>
                  {elt.images.length > 0 ? <img src={elt.images[0].url} alt={elt.name}></img> : null}
                  <p> {elt.name}</p>
                </div>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <p>vide</p>
      </div>
    );
  }
};

export default ShowResultat;
