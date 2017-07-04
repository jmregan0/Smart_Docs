import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'APP/fire'
import store from '../store'
import {setCurrentUser} from '../action-creators/users'
import {browserHistory } from 'react-router';


export default class CreateTopic extends React.Component {
    constructor(){
        super();
        this.state={
                    setSelectedRoomFirebase:false,
                    roomsList: {},
                    roomsSelected: {name:"", rid:"", users:{}},
                    self:{uid:"", name:""},
                    value:'',
                    refRoom:null,
                    submitDisabled:true,
                    isValidationError:false,
                    filter:'',
                    filteredList:{}
                 }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange(event){
        this.setState({value: event.target.value});
        if(event.target.value.length<4){
            this.setState({submitDisabled:true, isValidationError:"Room names cannot be less than 4 characters"})
            document.getElementById("sub-btn").disabled=true
        }else if(event.target.value.length>25){
            this.setState({submitDisabled:true, isValidationError:"Room names cannot be greater than 25 characters"})
            document.getElementById("sub-btn").disabled=true
        }else{
            this.setState({submitDisabled:false, isValidationError:false})
            document.getElementById("sub-btn").enabled=true
        }
    }  

    handleSubmit(event){
        event.preventDefault()
        var duplicate=false;
        if(this.state.roomsList){
            Object.keys(this.state.roomsList).forEach((room)=>{
                if(room===this.state.value){
                    this.setState({isValidationError:"Room name already exists"})
                    duplicate=true;
                }
            })
        }
        if(!duplicate){
            var userName=this.state.self.name?this.state.self.name:"anon"
            var name = this.state.value;
            store.dispatch(setCurrentUser({uid:"", name:name}))   
            this.props.fireRefRoom.child(name).child('users').on('value', data=>{
                this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').off()
            });
            browserHistory.push("/edison/"+this.state.value)
        }
    }

    componentDidMount(){
        this.props.fireRefRoom.once('value', data=>{
            this.setState({roomsList:data.val()})
        })
        this.props.fireRefRoom.on('value', data=>{
            this.setState({roomsList:data.val()})
            if(this.state.setSelectedRoomFirebase){
                this.setState({roomsSelected: {rid:this.state.setSelectedRoomFirebase, name:this.state.setSelectedRoomFirebase, users:data.val()[this.state.setSelectedRoomFirebase].users}})
                this.setState({setSelectedRoomFirebase:false})
            }
        });
        firebase.auth().onAuthStateChanged((user)=> {
            if(user){
                var name = user.email?user.email:"anon"
                this.setState({self: {uid:user.uid, name:name}, inRoom:false, roomsSelected: {name:"", rid:"", users:{}}})
            }
        })
    }

    componentWillUnmount(){
        this.props.fireRefRoom.off()
    }

    render(){
        return(
        <div className="col-sm-12">
            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                {this.state.isValidationError?<h5>{this.state.isValidationError}</h5>:null}
                <form onSubmit={this.handleSubmit}>
                  <h5 className="nav-header">Create Topic:<br/></h5>
                  <input type="text" name="firstname" value={this.state.value} onChange={this.handleFormChange}/>
                  <br/>
                  <input id="sub-btn" className="btn btn-primary" type="submit" value="Submit" disabled={this.state.submitDisabled}/>
                </form>
                </div>
            </div>
        </div>
        )
    }
}

