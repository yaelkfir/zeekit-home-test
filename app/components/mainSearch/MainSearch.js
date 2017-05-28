
import React from 'react';
import {connect} from 'react-redux';

class MainSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      query: null

    };
  }

componentDidMount(){
    if(this.props.theProps.match.params.query !== undefined){
      this.searchInput.value = this.props.theProps.match.params.query
    }
}
  searchSubmit(e) {
    e.preventDefault();

    const search = this.searchInput.value;
    this.searchInput.value = search;
    this.setState({query:this.searchInput.value});

    if (search.length > 0) {
      this.props.theProps.history.push(`/search/${search}`);
    }
  }

  render() {
    return (
      <div className="search-container">
        <span className="fa fa-search" aria-hidden="true" onClick={(e) => this.searchSubmit(e)}/>
        <form onSubmit={(e) => this.searchSubmit(e)}>
          <input
            ref={(ref) => this.searchInput = ref}
            className="search"
            type="search"
            placeholder="search country"
          />
          <button onClick={(e) => this.searchSubmit(e)}>search</button>
        </form>
      </div>    );
  }
}

function mapStateToProps({testReducer,searchData}) {
  return {
    testReducer: testReducer,
    searchData:searchData
  };
}

function mapDispatchToProps(dispatch) {

  return {
    setResults(data ,query, page, totalPages) {
      dispatch({
        type: 'SET_SEARCH_RESULTS',
        data: data,
        query: query,
        page: page,
        totalPages: totalPages
      });
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainSearch);
