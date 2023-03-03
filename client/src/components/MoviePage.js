import React from "react";
import Header from "./Header";
import { Context } from "../App";

function MoviePage() {
  const { fetchedShow } = React.useContext(Context);
  let posterLink;

  if (fetchedShow) {
    try {
      posterLink = fetchedShow.image.medium;
    } catch (err) {
      posterLink =
        "/Users/suhail/Desktop/TV-SHOWS/client/src/components/blank-poster.png";
    }

    return (
      <>
        <Header />
        <div className="moviePage">
          <div className="movieCard">
            <img src={posterLink} />
            <div>
              <h1 className="title">{fetchedShow.name}</h1>
              {fetchedShow.rating.average !== null && (
                <h3>Rating: {fetchedShow.rating.average}</h3>
              )}

              <h3>
                {fetchedShow.premiered !== null && fetchedShow.premiered} |{" "}
                {fetchedShow.type !== null && fetchedShow.type} |{" "}
                {fetchedShow.language !== null && fetchedShow.language}
              </h3>
              <p>{fetchedShow.summary}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MoviePage;
