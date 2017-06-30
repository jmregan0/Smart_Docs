import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'APP/fire'
import store from '../store'
import {setCurrentUser} from '../action-creators/users'


export default class RoomSidebar extends React.Component {
    constructor(){
        super();
        this.state={
                    setSelectedRoomFirebase:false,
                    roomsList: {},
                    roomsSelected: {name:"", rid:"", users:{}},
                    self:{uid:"", name:""},
                    value:'',
                    inRoom:false
                 }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.roomClickHandler = this.roomClickHandler.bind(this)
        this.backToRoomsClickHandler = this.backToRoomsClickHandler.bind(this)

    }


    handleFormChange(event){
        this.setState({value: event.target.value});

    }

    roomClickHandler(event){
        var name = event.target.name;

        var userName=this.state.self.name
        //set selected room
        this.props.fireRefRoom.child(name).child('users').on('value', data=>{
            this.setState({roomsSelected: {rid:name, name:name, users:data.val()}})
        });

        //fix

        console.log(" disconnecting from", name)
        this.setState({setSelectedRoomFirebase:name},()=>{
            this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).transaction((currentData)=>{
                // console.log("-----this should never be null", this.state.roomsSelected)
                console.log("----------important", name)
            this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).onDisconnect().set({userName:this.state.self.name, inRoom:false})

                if(currentData===null){
                    // console.log("currentdata doesnt exist")
                    return {userName:userName, inRoom:true}
                }else{
                    // console.log("currentData exists")
                    this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).set({userName:userName, inRoom:true})
                }

            })
        })

        this.setState({inRoom:true})

    }

    userClickHandler(event){

        store.dispatch(setCurrentUser(event.target.innerHTML))

    }

    backToRoomsClickHandler(){
        console.log("-----this.selectedRoom", this.state.roomsSelected)
        console.log("1", this.state.roomsSelected.name)
        console.log("2", this.state.self.uid)

        this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).set({userName:this.state.self.name, inRoom:false})

        this.setState({inRoom:false})
        this.setState({value:""})
    }

    handleSubmit(event){
        event.preventDefault()

            // User is signed in.

        var userName=this.state.self.name?this.state.self.name:"anon"
        var name = this.state.value;


        this.setState(
            {setSelectedRoomFirebase:name}, ()=>{
                this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).onDisconnect().set({userName:this.state.self.name, inRoom:false})
                this.props.fireRefRoom.child(name).child('users').on('value', data=>{
                    console.log({roomsSelected: {rid:name, name:name, users:data.val()}})
                    this.setState({roomsSelected: {rid:name, name:name, users:data.val()}})
                });

                this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).transaction((currentData)=>{
                    if(currentData===null){
                        return {userName:userName, inRoom:true}
                    }else{
                        console.log("room is already created", currentData)
                        this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).set({userName:userName, inRoom:true})
                    }

                })
            }
                    //place for transaction
        )

        this.setState({inRoom:true})

    }

    componentDidMount(){

        //load all rooms,
        this.props.fireRefRoom.once('value', data=>{

            this.setState({roomsList:data.val()})

        })

        this.props.fireRefRoom.on('value', data=>{

            this.setState({roomsList:data.val()})
            console.log("update before fire", this.state.setSelectedRoomFirebase)
            if(this.state.setSelectedRoomFirebase){
                // console.log("update is firing")
                var newStatePrime = Object.assign(this.state, {roomsSelected: {rid:this.state.setSelectedRoomFirebase, name:this.state.setSelectedRoomFirebase, users:data.val()[this.state.setSelectedRoomFirebase].users}})
                this.setState(newStatePrime)
                console.log("setting setSelectedRoomFirebase to false")
                this.setState({setSelectedRoomFirebase:false})
            }else{

            }

        });


        // this.props.fireRefRoom.child("disconnected").onDisconnect().set("disconnected")

        firebase.auth().onAuthStateChanged((user)=> {
            if(user){

                var name = user.email?user.email:"anon"

                if(this.state.roomsSelected.name){
                    this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).set({userName:this.state.self.name, inRoom:false})
                }

                this.setState({self: {uid:user.uid, name:name}, inRoom:false, roomsSelected: {name:"", rid:"", users:{}}}, ()=>{
                    // this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).set({userName:this.state.self.name, inRoom:false})
                })

            }


        })
    }

    render(){
        var bool=this.state.inRoom

        console.log(this.state.roomsList)
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
                        {
                            Object.keys(this.state.roomsSelected.users).map((user)=>{
                                return (
                                    this.state.roomsSelected.users[user].inRoom?<li onClick={this.userClickHandler}><a name={user}>{this.state.roomsSelected.users[user].userName}</a></li>:null
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
                  <input className="btn btn-primary" type="submit" value="Submit"/>
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

