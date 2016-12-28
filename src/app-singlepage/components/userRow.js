import React from 'react';
import ReactDOM from 'react-dom';

var UserRow = React.createClass({
  displayName: 'UserRow',
  propTypes: {
    onInputChange: React.PropTypes.func //функция для возврата введенного значения в родителя.
  },

  getInitialState() {
    return({

    });
  },
  render() {
    return (
      <div>
        ROW
      </div>
    );
  }
});

export default UserRow;