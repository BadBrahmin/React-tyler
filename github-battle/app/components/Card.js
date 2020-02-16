import React from "react";
import PropTypes from "prop-types";

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children
}) {
  return (
    <div className="card bg-light">
      <h4 className="header-lg center-text">
        {header}
        {/* {winner.score === loser.score ? "Tie" : "Winner!"} */}
      </h4>
      <img className="avatar" src={avatar} alt={`Avatar for ${name}`}></img>

      {/* subheader rendering only if it exists */}
      {subheader && <h4 className="center-text"> {subheader} </h4>}

      <h2 className=" center-text">
        <a className="link" href={href}>
          {name}
        </a>
      </h2>
      {children}
    </div>
  );
}

Card.PropTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
