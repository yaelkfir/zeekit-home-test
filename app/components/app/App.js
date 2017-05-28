import React from 'react';

import MainSearch from '../mainSearch/MainSearch'
import Content from '../content/Content'

export default class Root extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>zeekit test</h1>
        <MainSearch theProps={this.props}/>
        <Content theProps={this.props}/>
      </div>
    );
  }

};
