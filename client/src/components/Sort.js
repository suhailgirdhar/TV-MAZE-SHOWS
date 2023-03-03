import React from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../App";

const familyList = [];
const comedyList = [];
const romanceList = [];
let posterLink;

function CreateMovieCard(movieData, index) {
  const { setClickQuery } = React.useContext(Context);

  const name = movieData._embedded.show.name;
  const id = movieData._embedded.show.id;

  function HandleClick() {
    setClickQuery(id);
  }

  try {
    posterLink = movieData._embedded.show.image.medium;
  } catch (err) {
    posterLink =
      "/Users/suhail/Desktop/TV-SHOWS/client/src/components/blank-poster.png";
  }

  return (
    <NavLink
      key={index}
      to={`shows/${id}`}
      className="card"
      onClick={HandleClick}
    >
      <img src={posterLink} />
      <p>{`${name.substr(0, 15)}...`}</p>
    </NavLink>
  );
}

function Sort() {
  const { apiResponse } = React.useContext(Context);

  apiResponse.map((value, index) => {
    const genre = value._embedded.show.genres;

    if (genre.includes("Family")) {
      familyList.push(value);
    }
    if (genre.includes("Comedy")) {
      comedyList.push(value);
    }
    if (genre.includes("Romance")) {
      romanceList.push(value);
    }
  });

  let carouselList = document.querySelectorAll(".cardCarousel");

  function ScrollRight(event) {
    console.log(event);
    if (event.target.id === "famList") {
      carouselList[0].scrollLeft = carouselList[0].scrollLeft + 500;
    } else if (event.target.id === "comList") {
      carouselList[1].scrollLeft = carouselList[1].scrollLeft + 500;
    } else if (event.target.id === "romList") {
      carouselList[2].scrollLeft = carouselList[2].scrollLeft + 500;
    }
  }

  function ScrollLeft(event) {
    console.log(event);
    if (event.target.id === "famList") {
      carouselList[0].scrollLeft = carouselList[0].scrollLeft - 500;
    } else if (event.target.id === "comList") {
      carouselList[1].scrollLeft = carouselList[1].scrollLeft - 500;
    } else if (event.target.id === "romList") {
      carouselList[2].scrollLeft = carouselList[2].scrollLeft - 500;
    }
  }

  return (
    <>
      <h1>Genre Family</h1>

      <div className="parentCarousel">
        <button className="prevBtn" onClick={ScrollLeft}>
          <p id="famList">&lt;</p>
        </button>
        <button className="nextBtn" onClick={ScrollRight}>
          <p id="famList">&gt;</p>
        </button>

        <div className="cardCarousel">{familyList.map(CreateMovieCard)}</div>
      </div>

      <h1>Genre Comedy</h1>

      <div className="parentCarousel">
        <button className="prevBtn" onClick={ScrollLeft}>
          <p id="comList">&lt;</p>
        </button>
        <button className="nextBtn" onClick={ScrollRight}>
          <p id="comList">&gt;</p>
        </button>

        <div className="cardCarousel">{comedyList.map(CreateMovieCard)}</div>
      </div>

      <h1>Genre Romance</h1>

      <div className="parentCarousel">
        <button className="prevBtn" onClick={ScrollLeft}>
          <p id="romList">&lt;</p>
        </button>
        <button className="nextBtn" onClick={ScrollRight}>
          <p id="romList">&gt;</p>
        </button>

        <div className="cardCarousel">{romanceList.map(CreateMovieCard)}</div>
      </div>
    </>
  );
}

export default Sort;
