import React from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from "react-icons/fa";
import PropTypes from "prop-types";
import Results from "./Results";

function Instructions() {
  return (
    <>
      <div className="instructions-container">
        <h1 className=" center-text header.lg"> Instructions </h1>
      </div>

      <ol className=" container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter Usernames</h3>
          <button
            onClick={() => {
              console.log("usernames");
            }}
          >
            <FaUserFriends className="bg-light" color="tomato" size={140} />
          </button>
        </li>

        <li>
          <h3 className="header-sm">Battle</h3>
          <button
            onClick={() => {
              console.log("battle");
            }}
          >
            <FaFighterJet className="bg-light" color="#727272" size={140} />
          </button>
        </li>

        <li>
          <h3 className="header-sm">See Winners</h3>
          <button
            onClick={() => {
              console.log("results");
            }}
          >
            <FaTrophy className="bg-light" color="tomato" size={140} />
          </button>
        </li>
      </ol>
    </>
  );
}

class PlayerInput extends React.Component {
  //setup state "username"
  //return form
  //onSubmit => handlesubmit (bind)
  constructor(props) {
    super();
    this.state = {
      username: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  // handleSubmit = () => {
  //   event.preventDefault();
  //   this.props.onSubmit(this.state.username);
  // };

  // handleChange = () => {
  //   this.setState({ username: event.target.value });
  // };

  render() {
    // console.log(this);

    return (
      <form className="column-player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>

        <div className="row player-inputs">
          <input
            type="text"
            id="username"
            className="input-light"
            placeholder="github-username"
            value={this.state.username}
            onChange={this.handleChange}
          ></input>
          <button
            className="btn dark-btn"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

function PlayerPreview({ username, onReset, label }) {
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className="row bg-light">
        <div className="player-info">
          <img
            className="avatar-small"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player
    });
    // console.log(this.state);
  }

  handleReset(id) {
    this.setState({
      [id]: null
    });
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state;

    if (battle === true) {
      return <Results playerOne={playerOne} playerTwo={playerTwo} />;
    }
    return (
      <>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>

          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={player => this.handleSubmit("playerOne", player)}
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label="Player One"
                onReset={() => this.handleReset("playerOne")}
              />
            )}

            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit("playerTwo", player)}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label="Player Two"
                onReset={() => this.handleReset("playerTwo")}
              />
            )}
          </div>

          {playerOne && playerTwo && (
            <button
              className="btn dark-btn btn-space"
              onClick={() => this.setState({ battle: true })}
            >
              Battle
            </button>
          )}
        </div>
      </>
    );
  }
}
