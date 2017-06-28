import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'APP/fire'
import store from '../store'
import {setCurrentUser} from '../action-creators/users'


export default class RoomSidebar extends React.Component {
    constructor(){
        super();
        this.state={
                    rooms: {
                        list:[], selected:{}
                    },
                    users: {
                        list:[], selected:{}, self:""                       
                    },
                    value:'',
                    inRoom:false
                    
                 }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.roomClickHandler = this.roomClickHandler.bind(this)
    }

    handleSubmit(event){
        event.preventDefault()
        // console.log("created new room with name:", this.state.value)

        firebase.auth().onAuthStateChanged((user)=> {
          
          if (user) {
            // User is signed in.
            this.props.fireRefRoom.child(this.state.value).child('users').push({user:user.uid, inRoom:true})
            // console.log(user.uid)

          } else {
            // No user is signed in.
            console.log("please sign in")
          }
            this.props.fireRefRoom.child(this.state.value).child('users').push({user:'gregory', inRoom:true})
        });

    }

    handleFormChange(event){
        this.setState({value: event.target.value});
        
    }

    roomClickHandler(event){

        var newState=Object.assign(this.state.users, {list:this.state.rooms.list[event.target.innerHTML].users})
        this.setState(newState) 
        this.setState({inRoom:true})

        console.log("onroom click", this.state)
    }

    userClickHandler(event){

        setCurrentUser(event.target.innerHTML)
        console.log("selected user set in store")
    }

    componentDidMount(){

        //load all rooms,
        this.props.fireRefRoom.once('value', data=>{

            var newState = Object.assign(this.state.rooms, {list:data.val()})
            this.setState(newState)
            
        })

        this.props.fireRefRoom.on('value', data=>{
            var newState = Object.assign(this.state.rooms, {list:data.val()})
            this.setState(newState)
           
        });

        firebase.auth().onAuthStateChanged((user)=> {
            
            var newState = Object.assign(this.state.users,{self:user.uid})
            this.setState(newState)
        })
        
            
       

    }

    render(){
        var bool=this.state.inRoom
        var userio="guest"
        console.log("this.state.user in render", this.state.users)
        firebase.auth().onAuthStateChanged((user)=> {
            userio=user;
        })
        
        return(
        <div>
        {
            bool?
            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                    <ul className="nav ">
                        <li id="main-user-head" className="nav-header"><a href="#">Own User -{this.state.users.self}</a></li>
                        <li onClick={this.userClickHandler}>Users List</li>
                        {
                            Object.keys(this.state.users.list).map((user)=>{
                                return (
                                    <li onClick={this.userClickHandler}><a>{user}</a></li>
                                    )
                            })
                        }
                    </ul>
                </div>
            </div>
            :            
            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                <form onSubmit={this.handleSubmit}>
                  Create Room:<br/>
                  <input type="text" name="firstname" value={this.state.value} onChange={this.handleFormChange}/>
                  <br/>
                  <input type="submit" value="Submit"/>
                </form> 
                <ul className="nav ">
                    <li className="nav-header">List Rooms</li>
                    {
                        this.state.rooms.list?Object.keys(this.state.rooms.list).map((room)=>{
                            return(
                                    <li name={room} onClick={this.roomClickHandler}><a>{room}</a></li>
                                )
                        }):null
                    }
                </ul>
                </div>
            </div>
            
        }
        </div>

        )

    }  
}

