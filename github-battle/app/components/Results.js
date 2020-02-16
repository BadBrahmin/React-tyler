import React from "react";
import { battle } from "../utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from "react-icons/fa";
import Card from "./Card";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then(players => {
        // console.log("data: ", players);

        //in case of successful mount
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        });
      })

      //incase of error
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        });
      });
  }
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <p>Loading</p>;
    }
    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner!"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          name={winner.profile.login}
        >
          <ul className="card-list">
            <li>
              <FaUser color="tomato" size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color="tomato" size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color="tomato" size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="tomato" size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="tomato" size={22} />
              {winner.profile.following.toLocaleString()} followers
            </li>
          </ul>
        </Card>

        <Card
          header={winner.score === loser.score ? "Tie" : "Loser :("}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
        >
          <ul className="card-list">
            <li>
              <FaUser color="tomato" size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FaCompass color="tomato" size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color="tomato" size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="tomato" size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="tomato" size={22} />
              {loser.profile.following.toLocaleString()} followers
            </li>
          </ul>
        </Card>
      </div>
    );
  }
}
