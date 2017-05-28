import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import ISO6391 from 'iso-639-1';


class Filters extends React.Component {

  constructor() {
    super();
    this.state = {
      valueRegion: 'all',
      valueLang: 'all',

    };

  }

  componentDidMount() {

    console.info(this.props.theProps.match.params);

    if (this.props.theProps.match.params.query !== undefined) {

      if (this.props.theProps.match.params.region !== undefined && this.props.theProps.match.params.lang !== undefined) {
        this.setState({
          valueRegion: this.props.theProps.match.params.region,
          valueLang: this.props.theProps.match.params.lang
        });
        this.GetXhrAllFilters(this.props.theProps.match.params.query, this.props.theProps.match.params.region, this.props.theProps.match.params.lang)
      }

      if (this.props.theProps.match.params.region !== undefined) {
        this.setState({valueRegion: this.props.theProps.match.params.region})
        this.GetXhrFilter(this.props.theProps.match.params.query, this.props.theProps.match.params.region, 'Regions');
      }

      if (this.props.theProps.match.params.lang !== undefined) {
        this.setState({valueLang: this.props.theProps.match.params.lang})
        this.GetXhrFilter(this.props.theProps.match.params.query, this.props.theProps.match.params.lang, 'lang');

      }
    }

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.theProps.match.params.query !== this.props.theProps.match.params.query) {
      this.setState({
        valueRegion: 'all',
        valueLang: 'all'
      });
    }
  }

  GetXhrAllFilters(searchQuery, region, lang) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://restcountries.eu/rest/v2/name/${searchQuery}`);

    xhr.addEventListener('load', () => {

      let appData = JSON.parse(xhr.responseText);
      let tempLang = ISO6391.getCode(`${lang}`);
      let tempResultsData = [];
      let resultsData = [];
      if (region !== 'all') {
        for (const country of appData) {
          if (country.region === region) {
            tempResultsData.push(country);
          }
        }
      }
      else {
        tempResultsData = appData;
      }

      if (lang !== 'all') {
        for (const country of tempResultsData) {
          for (const languages of country.languages)

            if (languages.iso639_1 === tempLang) {

              resultsData.push(country);
            }
        }
      }
      else {
        resultsData = appData;
      }

      console.info('ResultsData', resultsData);

      this.props.setResults(resultsData);

    });

    xhr.addEventListener('error', () => {
      console.info('error');
    });

    xhr.send();

  }

  GetXhrFilter(searchQuery, data, target) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://restcountries.eu/rest/v2/name/${searchQuery}`);

    xhr.addEventListener('load', () => {

      let appData = JSON.parse(xhr.responseText);
      let resultsData = [];

      if (target === 'Regions') {
        if (data === 'all') {
          resultsData = [...appData];
        }

        else {
          for (const country of appData) {
            if (country.region === data) {
              resultsData.push(country);
            }
          }
        }
      }

      else {
        if (data === 'all') {
          resultsData = [...appData];
        }
        else {
          let tempLang = ISO6391.getCode(`${data}`);

          for (const country of appData) {
            for (const languages of country.languages)

              if (languages.iso639_1 === tempLang) {
                resultsData.push(country);
              }
          }
        }
      }

      this.props.setResults(resultsData);


    });

    xhr.addEventListener('error', () => {
      console.info('error');
    });

    xhr.send();

  }

  filterByRegion(e) {

    if (this.props.theProps.match.params.lang === undefined) {
      this.props.theProps.history.push(`/search/${this.props.theProps.match.params.query}/region/${e.target.value}`);

      this.GetXhrFilter(this.props.theProps.match.params.query, e.target.value, e.target.name);

    }
    else {
      this.props.theProps.history.push(`/search/${this.props.theProps.match.params.query}/lang/${this.props.theProps.match.params.lang}/region/${e.target.value}`);
      this.GetXhrAllFilters(this.props.theProps.match.params.query, e.target.value, this.props.theProps.match.params.lang);
    }

    this.setState({valueRegion: e.target.value})

  }

  filterByLang(e) {
    if (this.props.theProps.match.params.region !== undefined) {

      this.props.theProps.history.push(`/search/${this.props.theProps.match.params.query}/region/${this.props.theProps.match.params.region}/lang/${e.target.value}`);
      this.GetXhrAllFilters(this.props.theProps.match.params.query, this.props.theProps.match.params.region, e.target.value);
    }

    else {
      this.props.theProps.history.push(`/search/${this.props.theProps.match.params.query}/lang/${e.target.value}`);
      this.GetXhrFilter(this.props.theProps.match.params.query, e.target.value, e.target.name)

    }

    this.setState({valueLang: e.target.value});

  }

  render() {
    if (this.props.theProps.match.params.query) {
      return (
        <div>
          <h2>results for "{this.props.theProps.match.params.query}"</h2>
          <select name="Regions" value={this.state.valueRegion} onChange={(e) => {
            this.filterByRegion(e)
          }}>
            <option className="Region" value="all">All Regions</option>
            <option className="Region" value="Africa">Africa</option>
            <option className="Region" value="Americas">Americas</option>
            <option className="Region" value="Asia">Asia</option>
            <option className="Region" value="Oceania">Oceania</option>
          </select>
          <select name="language" value={this.state.valueLang} onChange={(e) => {
            this.filterByLang(e)
          }}>
            <option value="all">All Language</option>
            {ISO6391.getAllNames().map((lang) => <option key={uuid()} value={`${lang}`}>{lang}</option>)}
          </select>
        </div>);
    }

    else {
      return null;
    }
  }
}

function mapStateToProps({testReducer, searchData}) {
  return {
    testReducer: testReducer,
    searchData: searchData
  };
}

function mapDispatchToProps(dispatch) {

  return {
    setResults(data) {
      dispatch({
        type: 'SET_SEARCH_RESULTS',
        data: data,
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);







