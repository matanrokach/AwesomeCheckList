import materializecss from 'materialize-css/dist/css/materialize.min.css';
import materializejs from 'materialize-css/dist/js/materialize.min.js';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import TaskList from './TaskList';
import Archive from './Archive';
import SocketIOBasic from './SocketIOBasic';

class App extends Component {
state = {tasks: '', singleTask: {} }

componentDidMount(){
  this.props.fetchTasks();
}

render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={TaskList} />
            <Route path="/archive" component={Archive} />
            <SocketIOBasic />
          </div>
        </BrowserRouter>
      </div>
    );
  };
};
function mapStateToProps (state){
  return { tasks: state.tasks };
}
export default connect(mapStateToProps, actions)(App);
