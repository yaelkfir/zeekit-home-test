import React from 'react';
import {connect} from 'react-redux';

import Grid from '../grid/Grid'
import Filters from '../filters/Filters'

class Content extends React.Component {

  constructor() {
    super();


  }

  render() {
    return (
      <div className="content-container">
        <Filters theProps={this.props.theProps}/>
        <Grid theProps={this.props.theProps}/>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Content);







