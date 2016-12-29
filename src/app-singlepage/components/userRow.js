import React from 'react';
import ReactDOM from 'react-dom';

var classNames = require('classnames');

var UserRow = React.createClass({
  displayName: 'UserRow',
  propTypes: {
    item: React.PropTypes.object, // значения в строке
    errors: React.PropTypes.object, // ошибки в строках
    onInputChange: React.PropTypes.func, //функция для возврата введенного значения в родителя.
    deleteRow: React.PropTypes.func, // функция удаления строки пользователя
    id: React.PropTypes.number, // индекс пользователя в общем массиве
  },

  getInitialState() {
    return({
        model: this.props.model,
        errors: this.props.errors || {}
    });
  },
  componentWillReceiveProps(nextProps) {
      this.setState({
          model: nextProps.item || {},
          errors: nextProps.errors || {},
          count: nextProps.count
      })
  },

  render() {
    let errors = this.state.errors;
    return (
      <form className="row">
        <div className="col-md-1 text-right">
            <h5>{this.props.count !== null ? '#' + this.props.count  : null}</h5>
        </div>
        <div className="col-md-3">
          <div className={classNames("form-group", {"has-error" : _.get(errors, 'UserName')})}>
            <input onChange={this.props.onInputChange.bind(null, this.props.id)} value={this.state.model.UserName} type="text" className="form-control" name="UserName" placeholder="Имя" />
          </div>
        </div>

        <div className="col-md-3">
          <div className={classNames("form-group", {"has-error" : _.get(errors, 'UserSurname')})}>
            <input onChange={this.props.onInputChange.bind(null, this.props.id)} value={this.state.model.UserSurname} type="text" className="form-control" name="UserSurname" placeholder="Фамилия" />
          </div>
        </div>

        <div className="col-md-3">
          <div className={classNames("form-group", {"has-error" : _.get(errors, 'UserPhone')})}>
            <input onChange={this.props.onInputChange.bind(null, this.props.id)} type="text" value={this.state.model.UserPhone} className="form-control" name="UserPhone" placeholder="Телефон" />
          </div>
        </div>

        <div className="col-md-2">
          <button type="button" className="btn btn-warning" onClick={this.props.deleteRow.bind(null, this.props.id)}>Delete</button>
        </div>
      </form>
    );
  }
});

export default UserRow;