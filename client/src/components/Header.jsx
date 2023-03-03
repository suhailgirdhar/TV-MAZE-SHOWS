import React from "react";
import { Context } from "../App";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { searchQuery, setSearchQuery } = React.useContext(Context);
  const [input, setInput] = React.useState("");
  const currentInput = React.useRef(input);

  let currInput = currentInput.current;
  currInput = input;

  function HandleClick(event) {
    setSearchQuery(input);
  }

  function HandleChange(event) {
    setInput(event.target.value);
  }

  return (
    <div>
      <div>
        <div className="TitleSection">
          <h1>TV MAZE</h1>
          <div className="searchSection-parent">
            <div className="searchSection-child">
              <NavLink to={`/search/shows/${currInput}`} onClick={HandleClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
              </NavLink>
              <input
                className="search-input"
                onChange={HandleChange}
                value={input}
              />
            </div>
          </div>
        </div>

        <hr className="hr"></hr>
      </div>
    </div>
  );
}

export default Header;
