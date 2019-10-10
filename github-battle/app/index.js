import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/popular";
import DarkMode from "./components/DarkMode";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        {" "}
        <DarkMode />{" "}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
