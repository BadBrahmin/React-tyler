import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/popular";
import Battle from "./components/Battle";
// import DarkMode from "./components/DarkMode";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        {" "}
        <Popular />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
