import React from 'react';
import ReactDOM from 'react-dom';
import UserRow from './components/UserRow';

import './style.less';

require("jquery")(window);

//require('bootstrap');

var MyDiv = React.createClass({
  displayName: 'PageUsers',
  getInitialState() {
    return ({
      model: []
    });
  },
  render() {
    return (
      <div>
        MyDivs23424s
        <UserRow onInputChange={this._onInputChange} model={this.state.model}/>
      </div>
    );
  },
  _onInputChange (e) {
    console.log(e);
    console.log(e.target);
  }
});


ReactDOM.render((
  <MyDiv />
), document.getElementById('root'));
