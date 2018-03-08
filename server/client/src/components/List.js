import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Task from './Task';

// let preLoads[this.props.tasks]     preLoadActive={this.preLoads[task._id]} 

class List extends Component {

  state = { searchValue: ''};

  onFilterTextChangeHandler(searchValue){
    this.setState({ searchValue });
  }

  renderContent(){
    return this.props.tasks.filter(task1 => { if(task1.title.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1) return task1; }).map(task => {
      return(
        <Task key={task._id} id={task._id} title={task.title} done={task.done} archived={task.archived} time_added={task.time_added} imageurl={task.imageurl} />
      );
    });
  }

  render() {
    return(
      <div className="" style={{margin: "0px", padding: "0px"}} >
        <div className="card" style={{margin: "0px", padding: "0px"}}>
          <div className="row s12 m12">
            <div className="col s12 m12">

                <input className="col s12" placeholder="Search" onChange={(e)=>this.onFilterTextChangeHandler(e.target.value)} style={{padding: "0px 20px 0px 20px", margin: "0px"}} />

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="card">
              { this.renderContent() }
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(null, actions)(List);
