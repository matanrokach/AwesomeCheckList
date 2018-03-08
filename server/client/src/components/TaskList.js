import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchTasks } from '../actions';
import Header from './Header';
import Task from './Task';
import List from './List';
import { socket } from './SocketIOBasic';

class TaskList extends Component {

  state = {text: ''};

  onTextChangeHandler(e) {
    this.setState({text: e});
  }

  onBtnClickHandler() {

    let text = this.state.text;

    if(text){
      (async () => {
        await axios.get('/api/add_new_item/' + text);
        this.props.fetchTasks();
        this.setState({text: ''});
        socket.send('UPDATE_ALL_USERS');
      })();
    }
  }

  render() {
    return(
      <div>
      <Header active="tasklist" />
        <div className="row">
          <div className="col s12 m12">
            <List tasks={this.props.tasks.filter(task => { if(task.archived === false ) return task })} />
          </div>
        </div>
        <div className="card hoverable">
          <div className="row">
            <div className="col s12 m12">
              <input id="addTaskInput" placeholder="Add a task..." value={this.state.text} className="col s10" style={{padding: "20px", margin: "0px"}} onChange={(e) => this.onTextChangeHandler(e.target.value)} />
              <a className="col s2 waves-effect waves-light green lighten-1 btn" style={{height: "inherit", padding: "0px", margin: "3px 0px 3px 0px"}} onClick={() => this.onBtnClickHandler()}>
                add
              </a>
            </div>
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
