import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import io from 'socket.io-client';

export const socket = io('/');
let context;

class SocketIOBasic extends Component{

  state = {textToSend: ''};

  constructor(props){
    super(props);
    context = this;
  }

  componentDidMount(){
    socket.on('connect', function () {

        socket.on('message', function (message) {

          if(message === 'UPDATE_ALL_USERS')
            context.props.fetchTasks();
        });

        // socket.on('image-uploaded', function (message) {
        //     console.log(message.response);
        //     if(!message.response.statusCode){
        //       // alert("Error: " + message.response.statusCode);
        //
        //       // context.props.fetchTasks();
        //     }
        //     else {
        //       // context.props.fetchTasks();
        //       // socket.send("UPDATE_ALL_USERS");
        //     }
        //
        // });
    });
  }
  fetchSingleImage(name){
    name = (name != '' ? name : 'add-a-picture-icon.png');
    return socket.emit('download-image', { name });
  }

  render(){
    return(
      <div>
      </div>
    );
  }
}

function mapStateToProps (state){
  return { tasks: state.tasks };
}

export default connect(mapStateToProps, actions)(SocketIOBasic);
