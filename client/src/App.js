import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";
import SearchPage from "./components/SearchPage";
import Error from "./components/Error";

const Context = React.createContext();

function App() {
  const [apiResponse, setApiResponse] = useState([]);
  const [clickQuery, setClickQuery] = useState();
  const [fetchedShow, setFetchedShow] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [searchedShow, setSearchedShow] = useState();

  const API_URL = "https://api.tvmaze.com/schedule/full";
  const CLICKED_URL = `https://api.tvmaze.com/shows/${clickQuery}`;
  const SEARCHED_URL = `https://api.tvmaze.com/search/shows?q=${searchQuery}`;

  async function fetchMovies(url) {
    try {
      const movies = await fetch(url);
      const moviesData = await movies.json();
      setApiResponse(moviesData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(function () {
    fetchMovies(API_URL);
  }, []);

  async function fetchQuery(url) {
    try {
      const fetchedShow = await fetch(url);
      const fetchedShowData = await fetchedShow.json();
      setFetchedShow(fetchedShowData);
    } catch (err) {
      return;
    }
  }

  useEffect(
    function () {
      if (clickQuery) {
        fetchQuery(CLICKED_URL);
      }
      if (fetchedShow) {
        document.title = fetchedShow.name;
      }
    },
    [clickQuery]
  );

  async function SearchQuery(url) {
    try {
      const searchedShowURL = await fetch(url);
      const searchedShowData = await searchedShowURL.json();
      setSearchedShow(searchedShowData);
    } catch (err) {
      console.log(`failed to search ${err}`);
    }
  }

  useEffect(
    function () {
      if (searchQuery) {
        SearchQuery(SEARCHED_URL);
      }
    },
    [searchQuery]
  );

  return (
    <>
      <Router>
        <Context.Provider
          value={{
            apiResponse,
            setClickQuery,
            fetchedShow,
            searchQuery,
            setSearchQuery,
            searchedShow,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shows/:id" element={<MoviePage />} />
            <Route path="/search/shows/:id/shows/:id" element={<MoviePage />} />
            <Route path="/search/shows/:query" element={<SearchPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Context.Provider>
      </Router>
    </>
  );
}

export default App;
export { Context };
