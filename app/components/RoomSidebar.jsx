import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'APP/fire'
import store from '../store'
import {setCurrentUser} from '../action-creators/users'


export default class RoomSidebar extends React.Component {
    constructor(){
        super();
        this.state={
                    setSelectedFirebase:false,
                    roomsList: {},
                    roomsSelected: {name:"", rid:"", users:{}},
                    self:{},                       
                    value:'',
                    inRoom:false                 
                 }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.roomClickHandler = this.roomClickHandler.bind(this)
        this.backToRoomsClickHandler = this.backToRoomsClickHandler.bind(this)
        
    }

    handleSubmit(event){
        event.preventDefault()
        // console.log("created new room with name:", this.state.value)
        console.log("-a")
        firebase.auth().onAuthStateChanged((user)=> {
          
          if (user) {
            // User is signed in.
            this.props.fireRefRoom.child(this.state.value).child('users').push({user:user.uid, inRoom:true})
            // var newState=Object.assign(this.state, {roomsSelected:{rid:this.state.value, name:"", users:user.uid}})
            console.log("-c")
            // this.setState(newState) 

          } else {
            // No user is signed in.
            console.log("please sign in")
          }
        
        });

        var name = this.state.value;
        console.log("-b", this.state.roomsList)
        //need to include room name
        console.log("look at roomslist", this.state.roomsList)
        console.log("-d")
        this.setState({inRoom:true})
        this.setState({setSelectedFirebase:name})

    }

    handleFormChange(event){
        this.setState({value: event.target.value});
        
    }

    roomClickHandler(event){
        var name = event.target.name;
        console.log("cheeeck", name)
        var newState=Object.assign(this.state, {roomsSelected:{rid:event.target.name, name:"", users:this.state.roomsList[name].users}})

        this.setState(newState) 
        //need to include room name

        this.setState({inRoom:true})

        console.log("onroom click", this.state)
    }

    userClickHandler(event){

        store.dispatch(setCurrentUser(event.target.innerHTML))

    }

    backToRoomsClickHandler(){
        this.setState({inRoom:false})
    }

    componentDidMount(){

        //load all rooms,
        this.props.fireRefRoom.once('value', data=>{

            var newState = Object.assign(this.state, {roomsList:data.val()})
            this.setState(newState)

        })

        this.props.fireRefRoom.on('value', data=>{

            var newState = Object.assign(this.state, {roomsList:data.val()})
            this.setState(newState)
            if(this.state.setSelectedFirebase){

                console.log("what i need to work on - setSelectedFirebase", data.val()[this.state.setSelectedFirebase])
                var newStatePrime = Object.assign(this.state, {roomsSelected: {rid:this.state.setSelectedFirebase, name:this.state.setSelectedFirebase, users:data.val()[this.state.setSelectedFirebase].users}})
                this.setState(newStatePrime)
                this.setState({setSelectedFirebase:false})
            }

        });

        firebase.auth().onAuthStateChanged((user)=> {

            var newState = Object.assign(this.state, {self: {uid:user.uid, name:"sample name"}})
            this.setState(newState)
        })
    }

    render(){
        var bool=this.state.inRoom
        var userio="guest"
        console.log("this.state.roomsSelected in render", this.state.roomsSelected)
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
                        <li onClick={this.backToRoomsClickHandler}><a href="#">Back to Rooms List</a></li>
                        <li id="main-user-head" className="nav-header"><a href="#">Current Room - {this.state.roomsSelected.rid}</a></li>
                        <li onClick={this.userClickHandler}>Users List</li>
                        <li id="main-user-head" className="nav-header"><a href="#">Own User -{this.state.self.name}</a></li>
                        {
                            Object.keys(this.state.roomsSelected.users).map((user)=>{
                                return (
                                    <li onClick={this.userClickHandler}><a name={this.state.roomsSelected.users[user].user}>{this.state.roomsSelected.users[user].user}</a></li>
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
                        this.state.roomsList?Object.keys(this.state.roomsList).map((room)=>{
                            return(
                                    <li onClick={this.roomClickHandler}><a name={room}>{room}</a></li>
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

