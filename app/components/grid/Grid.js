import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';

class Grid extends React.Component {

  constructor() {
    super();
  }
componentWillMount(){
    if(this.props.theProps.match.params.query !== undefined){
      this.GetXhr(this.props.theProps.match.params.query)
    }
}

  componentWillReceiveProps(nextProps){

    if(this.props.theProps.match.params.query !== nextProps.theProps.match.params.query){

      this.GetXhr(nextProps.theProps.match.params.query)

    }
  }

  GetXhr(searchQuery) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET',`https://restcountries.eu/rest/v2/name/${searchQuery}`);

    xhr.addEventListener('load', () => {
      let appData = JSON.parse(xhr.responseText);
      this.props.setResults(appData)

    });

    xhr.addEventListener('error', () => {
      console.info('error');
    });

    xhr.send();

  }


  render() {
    if (this.props.searchData.length === 0) {
      return (
        <div>
          <span>results</span>
        </div>    );
    }
    else {

      return (
        <div>
          <ul>
            {this.props.searchData.map((country)=><li key={uuid()}>
              <h4>{country.name}</h4>
              <h5>borders:</h5>
              <ul>
                {country.borders.map((border)=> <li key={uuid()}>{border}</li>)}
              </ul>

              <sapn>population: {country.population}</sapn>
            </li>)}
          </ul>
        </div>
      );
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
        data: data
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);







