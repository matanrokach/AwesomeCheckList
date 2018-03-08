import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Moment from 'react-moment';
import {socket} from './SocketIOBasic';

const imagesRoot = "https://s3.eu-west-3.amazonaws.com/matanrokachbucket/uploaded/images/";
let context = null;

class Task extends Component {

  state={preLoadActive: false, modalActive: false};


  constructor(props){
    super(props);

  }

  componentDidMount(){
    socket.on('image-uploaded', function (message) {
        console.log(message.response);
        if(message.response.statusCode){
          // alert("bla: " + message.response.statusCode);
          context.setState({preLoadActive: false});
          // context.props.fetchTasks();
        }
        else {
          context.setState({imageUrl: message.imageurl});
          // context.props.fetchTasks();
          socket.send("UPDATE_ALL_USERS");
        }

    });
  }

  onFilePathChange(e, id) {
    let file = e.target;

    if (!file.files.length) {
        return;
    }

    console.log(file);
    console.log(file.size);

    if(file.files[0].size > 2097152) //do something if file size more than 2 mb (2097152)
    {
        alert('The file is bigger than 2MB!');
    }else{
      let firstFile = file.files[0];
      let reader = new FileReader();

      reader.onloadend = function () {
          socket.emit('upload-image', {
              name: firstFile.name,
              data: reader.result,
              taskid: id
          });
      };
      reader.readAsArrayBuffer(firstFile);

      this.setState({preLoadActive: true});
    }
  }

  changeTaskStatus(id, action) {
      this.props.changeTaskStatus(this.props.id, action);
  }

  imageHasBeenLoaded(){
    this.setState({preLoadActive: false});
    socket.send('UPDATE_ALL_USERS');
  }

  imageError(e){
    // this.setState({preLoadActive: false});
    // this.setState({imageUrl: "add-a-picture-icon.png"});
    // alert("Error occured while trying to load the image");
  }

  preloadRender(){
    if(this.state.preLoadActive)
      return (<div className="preloader-wrapper active" style={{position: "absolute", top: "50%", left: "50%"}}>
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>);
    else
      return;
  }

  renderModal(){
    if(this.state.modalActive){
      return(
        <div>
          <div className="divider" style={{width: "100%"}}></div>
          <div className="row s12" style={{margin: "5px"}}>
            <div className="col s6 center middle">
              <h6 className="right" style={{margin: "6px 3px 0px 3px"}}>
                Are you sure you want to delete this task?
              </h6>
            </div>
            <div className="col s6 center valign-wrapper">
              <a className="waves-effect waves-light btn green lighten-1" onClick={this.closeModal.bind(this)} style={{margin: "0px 3px 6px 3px"}}>No</a>
              <a className="waves-effect waves-light" onClick={(e)=>this.changeTaskStatus(this.props.id, 'delete')} style={{margin: "0px 3px 6px 3px"}}>YES!</a>
            </div>
          </div>
        </div>
      );
    }
    return;
  }

  openModal(){
    this.setState({modalActive: true});
  }

  closeModal(){
    this.setState({modalActive: false});
  }

  render(){
    context = this;
    return(
      <div className="card hoverable" key={this.props.id} style={{margin: "5px 0px 5px 0px", padding: "0px"}}>
        <div className="card-content" style={{margin: "0px", padding: "0px 0px 3px 0px", width: "100%"}}>
          <div className="row s12 m12 l12 xl12 " style={{margin: "0px", padding: "0px", width: "100%"}}>
            <a  onClick={this.openModal.bind(this)}><i className="material-icons right waves-effect">close</i></a>
            <div className="col s12 m6 l3 xl2 file-field input-field center" style={{margin: "0px", padding: "0px"}}>
            {this.preloadRender()}
              <input id={'input' + this.id} type="file" onChange={(e) => this.onFilePathChange(e, this.props.id)}  accept="image/*"/>
              <img id={"image" + this.props.id} onLoad={this.imageHasBeenLoaded.bind(this)} onError={this.imageError.bind(this)} src={imagesRoot + (this.props.imageurl ? this.props.imageurl : 'add-a-picture-icon.png') } style={{textAlign: "center", margin: "0px", padding: "0px", height: "inherit", width: "100%"}} />
            </div>
            <div className="col s12 m6 l9 xl10" style={{margin: "0px", padding: "0px"}}>
              <h5 className="center" style={{textDecoration: this.props.done ? "line-through" : "none", color: this.props.done ? "grey" : "black"}}>
                {this.props.title}
              </h5>
            </div>
          </div>
          <div className="row s12 m12 l12 xl12 " style={{margin: "0px", padding: "0px", width: "100%"}}>
            <div className="divider"></div>
          </div>
          <div className="row s12 m12 l12 xl12 " style={{margin: "0px", padding: "0px", width: "100%"}}>
            <div className="col s12 m6 l3 xl2 right" style={{textAlign: "center", margin: "0px", padding: "0px", height: "100%"}}>
              <a className="btn red lighten-1 btn-block" style={{textAlign: "center", margin: "0px", padding: "0px", height: "100%"}} onClick={(e)=>this.changeTaskStatus(this.props.id, this.props.done ? 'undone' : 'done')}>
                {this.props.done ? 'Mark as UnDone' : 'Mark as Done'}
              </a>
            </div>
            <div className="col s12 m6 l3 xl2 right" style={{textAlign: "center", margin: "0px", padding: "0px", height: "100%"}}>
              <a className="btn blue lighten-1 btn-block" style={{textAlign: "center", margin: "0px", padding: "0px", height: "100%"}} onClick={(e)=>this.changeTaskStatus(this.props.id, this.props.archived ? 'unarchive' : 'archive')}>
                {this.props.archived ? 'UnArchive' : 'Archive'}
              </a>
            </div>

            <div className="col s12 m12 valign-wrapper" style={{textAlign: "center", margin: "0px", padding: "0px", height: "100%"}}>
              <label>
                <Moment>
                  {this.props.time_added}
                </Moment>
              </label>
            </div>
          </div>
        </div>

        {this.renderModal()}

      </div>
    );
  };
}

export default connect(null, actions)(Task);
