import React from "react";
import Header from "./Header";
import { Context } from "../App";
import { NavLink } from "react-router-dom";

function SearchPage() {
  const { setClickQuery, searchedShow } = React.useContext(Context);

  function CreateSearchedMovieCard(showData, index) {
    const name = showData.show.name;
    const id = showData.show.id;
    let posterLink;

    function HandleClick() {
      setClickQuery(id);
    }

    try {
      posterLink = showData.show.image.medium;
    } catch (err) {
      posterLink =
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png";
    }

    return (
      <NavLink
        key={index}
        to={`shows/${name}`}
        className="searchCard"
        onClick={HandleClick}
      >
        <img src={posterLink} />
        <p>{name}</p>
      </NavLink>
    );
  }

  return (
    <>
      <Header />
      <div className="searchPage">
        {searchedShow && searchedShow.map(CreateSearchedMovieCard)}
      </div>
    </>
  );
}

export default SearchPage;
