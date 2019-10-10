import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "Python"];
  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={
              language === selected ? { color: "tomato" } : { color: "blue" }
            }
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export default class Popular extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedLanguage: "All",
      repos: null,
      error: null
    };
    console.log(this);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null
    });

    fetchPopularRepos(selectedLanguage)
      .then(repos =>
        this.setState({
          repos,
          error: null
        })
      )
      .catch(() => {
        console.log("Error fetching repos: ", error);

        this.setState({
          error: "There was an error fetching"
        });
      });
  }

  isLoading() {
    return this.state.repos === null && this.state.error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </>
    );
  }
}
