import React from 'react';
import ReactDOM from 'react-dom';
import UserRow from './components/UserRow';

import './../../node_modules/bootstrap/less/bootstrap.less';
import './style.less';

var _ = require('lodash');
//require('bootstrap');

function print_r(arr, level) {
  var print_red_text = "";
  if(!level) level = 0;
  var level_padding = "";
  for(var j=0; j<level+1; j++) level_padding += "    ";
  if(typeof(arr) == 'object') {
    for(var item in arr) {
      var value = arr[item];
      if(typeof(value) == 'object') {
        print_red_text += level_padding + "'" + item + "' :\n";
        print_red_text += print_r(value,level+1);
      }
      else
        print_red_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
    }
  }

  else  print_red_text = "===>"+arr+"<===("+typeof(arr)+")";
  return print_red_text + '\n';
}


var MyDiv = React.createClass({
  displayName: 'PageUsers',
  getInitialState() {
    return ({
      model: [{}],
      result: [],
      errors: {}
    });
  },
  render() {
    let notEmptyRowCounter = 0;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Users</h1>
          </div>
        </div>
        { this.state.model.map( (item, key) => {
          let index = null;
          if(!_.isEmpty(item)){
            console.log(notEmptyRowCounter);
            index = notEmptyRowCounter;
            notEmptyRowCounter++;
          }
          return(
                <UserRow key={key} id={key} onInputChange={this._onInputChange} deleteRow={this._deleteRow} model={item} errors={this.state.errors[key]} count={index}/>
              );

        })}
        <div className="row">
          <div className="col-md-8">
            <button type="button" className="btn btn-warning" onClick={this._addRow}>+</button>
          </div>
          <div className="col-md-4 text-right">
            <button type="button" className="btn btn-success" onClick={this._save}>Сохранить</button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="b-result">
              <h1>Results:</h1>
              <pre>
              {print_r(this.state.result)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  },
  _onInputChange (key, e) {
    let model = this.state.model;

    model[key][e.target.name] = e.target.value;

    if(!e.target.value) {
      delete model[key][e.target.name];
    }

    this.setState({
      model: model
    })

  },
  _addRow () {
    let model = this.state.model;
    model.push({});
    this.setState({
      model: model
    })
  },
  _deleteRow (key) {
    let model = this.state.model;
    delete  model[key];
    this.setState({
      model: model
    })
  },
  _save () {
    // клоникрование массива и!! вложенных свойст объекта
    let model = _.cloneDeep(this.state.model);
    let errors = _.cloneDeep(this.state.errors);
    let isErrors = false;

    let result = model.filter((item, key) => {
      if(!_.isEmpty(item)) {
        let rowValidate = this._validate(item, key);
        if(!_.isEmpty(rowValidate)) {
          isErrors = true;
          errors[key] = rowValidate
        } else {
          delete errors[key];
        }
      }
      return !_.isEmpty(item)
    });

    this.setState({
      errors: errors,
      result: isErrors ? [] : result
    });
  },
  _validate(item, key) {
    let lineError = {};

    /* массив проверок */
    if(!item.UserName) {
      lineError.UserName = 'Введите имя пользователя'
    }
    if(!item.UserSurname) {
      lineError.UserSurname = 'Введите фамилию пользователя'
    }
    if(!item.UserPhone) {
      lineError.UserPhone = 'Введите телефон пользователя'
    } else if (_.get(item.UserPhone, 'lenght') < 11) {
      lineError.UserPhone = 'Неполный номер телефона'
    }
    /* End массив проверок */

    return lineError;
  }
});


ReactDOM.render((
  <MyDiv />
), document.getElementById('root'));
