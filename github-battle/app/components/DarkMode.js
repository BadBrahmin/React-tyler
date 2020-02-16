import React from "react";

export default class DarkMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "light"
    };
    // this.handleLightMode = this.handleLightMode.bind(this);
    // this.handleDarkMode = this.handleDarkMode.bind(this);
  }
  handleLightMode() {
    console.log("light");
    this.setState({
      mode: "light"
    });
  }
  handleDarkMode() {
    console.log("dark");
    this.setState({
      mode: "dark"
    });
  }

  render() {
    // const { mode } = this.state;

    return (
      <div
        style={{
          height: "100%",
          background: this.state.mode === "light" ? "#fff" : "#000"
        }}
      >
        {this.state.mode === "light" ? (
          <button onClick={() => this.handleDarkMode()}>Dark Mode</button>
        ) : (
          <button onClick={() => this.handleLightMode()}>Light Mode</button>
        )}
      </div>
    );
  }
}
