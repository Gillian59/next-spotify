import React from "react";
import CategoryList from "../components/categories";
import ShowResultat from "../components/resultat";

export const FormSearch: React.FC<any> = ({ accessToken }) => {
  const [texteRecherche, setTexteRecherche] = React.useState("");
  const validateTexteRecherche = (texteRecherche: string) => {
    setTexteRecherche(texteRecherche);
  };
  return (
    <form
      className="w-100"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="form-group">
        <label htmlFor="Recherche">texteRecherche</label>
        <input
          type="text"
          className="form-control"
          id="texteRecherche"
          aria-describedby="texteRechercheHelp"
          value={texteRecherche}
          onChange={(event) => validateTexteRecherche(event.target.value)}
        />
      </div>
      <div>
        {texteRecherche === "" ? (
          <CategoryList accessToken={accessToken} />
        ) : (
          <ShowResultat accessToken={accessToken} texteToFind={texteRecherche}></ShowResultat>
        )}
      </div>
    </form>
  );
};
export default FormSearch;
