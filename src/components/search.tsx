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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {texteRecherche === null ? (
        <CategoryList accessToken={accessToken} />
      ) : (
        <ShowResultat accessToken={accessToken}></ShowResultat>
      )}
    </form>
  );
};
export default FormSearch;
