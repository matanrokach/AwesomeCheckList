import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchTasks } from '../actions';
import Header from './Header';
import List from './List';

class TaskList extends Component {

render() {
  return(
    <div>
    <Header active="archive" />
      <div className="row">
        <div className="col s12 m12">
          <List tasks={this.props.tasks.filter(task => { if(task.archived === true ) return task })} />
        </div>
      </div>
    </div>
    );
  };
}

function mapStateToProps (state){
  return { tasks: state.tasks };
}

export default connect(mapStateToProps, { fetchTasks })(TaskList);
