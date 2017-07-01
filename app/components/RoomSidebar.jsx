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
                    inRoom:false,
                    refRoom:null                
                 }

        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.roomClickHandler = this.roomClickHandler.bind(this)
        this.backToRoomsClickHandler = this.backToRoomsClickHandler.bind(this)
        this.userClickHandler = this.userClickHandler.bind(this)
    }


    handleFormChange(event){
        this.setState({value: event.target.value});
        
    }

    roomClickHandler(event){
        var name = event.target.name;

        store.dispatch(setCurrentUser({uid:"", name:name}))       
        var userName=this.state.self.name
        var userUid = this.state.self.uid
        //set selected room
        this.props.fireRefRoom.child(name).child('users').on('value', data=>{
            this.setState({roomsSelected: {rid:name, name:name, users:data.val()}})
            // this.props.fireRefRoom.child(name).child('users').off()
        });

        //fix

        // console.log(" disconnecting from", name)
        this.setState({setSelectedRoomFirebase:name},()=>{
            this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').transaction((currentData)=>{
                // console.log("-----this should never be null", this.state.roomsSelected)
                // console.log("----------important", name)
            this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').onDisconnect().set({userName:userName, uid:userUid, inRoom:false}) 

                if(currentData===null){
                    // console.log("currentdata doesnt exist")
                    return {userName:userName, uid:userUid, inRoom:true} 
                }else{
                    // console.log("currentData exists")
                    this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').set({userName:userName, uid:userUid, inRoom:true})
                }

            })
        })
        
        this.setState({inRoom:true})
        
    }
    
    userClickHandler(event){
        // console.log("this is rid", this)
        store.dispatch(setCurrentUser({uid:event.target.name, name:this.state.roomsSelected.rid}))

    }

    backToRoomsClickHandler(event){
        event.preventDefault()
        store.dispatch(setCurrentUser({uid:"", name:""})) 
        this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).child('userInfo').set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:false}) 
        this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').off()  

        this.setState({inRoom:false})
        this.setState({value:""})
    }

    handleSubmit(event){
        event.preventDefault()

            // User is signed in.

        var userName=this.state.self.name?this.state.self.name:"anon"
        var name = this.state.value;
        store.dispatch(setCurrentUser({uid:"", name:name}))   

        this.setState(
            {setSelectedRoomFirebase:name}, ()=>{
                this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').onDisconnect().set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:false})
                this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').on('value', data=>{
                    // console.log({roomsSelected: {rid:name, name:name, users:data.val()}})
                    this.setState({roomsSelected: {rid:name, name:name, users:data.val()}})
                    this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').off()
                });

                this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').transaction((currentData)=>{
                    if(currentData===null){
                        return {userName:this.state.self.name, uid:this.state.self.uid, inRoom:true} 
                    }else{
                        console.log("room is already created", currentData)
                        this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:true})
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
            // console.log("update before fire", this.state.setSelectedRoomFirebase)
            if(this.state.setSelectedRoomFirebase){
                // console.log("update is firing")
                var newStatePrime = Object.assign(this.state, {roomsSelected: {rid:this.state.setSelectedRoomFirebase, name:this.state.setSelectedRoomFirebase, users:data.val()[this.state.setSelectedRoomFirebase].users}})
                this.setState(newStatePrime)
                // console.log("setting setSelectedRoomFirebase to false")
                this.setState({setSelectedRoomFirebase:false})
            }else{

            }

        });

        
        // this.props.fireRefRoom.child("disconnected").onDisconnect().set("disconnected")

        firebase.auth().onAuthStateChanged((user)=> {
            if(user){

                var name = user.email?user.email:"anon"

                if(this.state.roomsSelected.name){
                    this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).child('userInfo').set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:false})
                }
                
                this.setState({self: {uid:user.uid, name:name}, inRoom:false, roomsSelected: {name:"", rid:"", users:{}}}, ()=>{
                    // this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).set({userName:this.state.self.name, inRoom:false})
                })
                
            }

        })
    }

    render(){
        var bool=this.state.inRoom

        // console.log(this.state.roomsSelected)
        return(
        <div>
        {
            bool?
            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                    <ul className="nav ">
                        <li onClick={this.backToRoomsClickHandler}><a href="#">Back to Rooms List</a></li>
                        <li id="main-user-head" className="nav-header">Current Room - {this.state.roomsSelected.rid}</li>
                        <li onClick={this.userClickHandler}>Browse Collab Notes By User</li>
                        {
                            Object.keys(this.state.roomsSelected.users).map((user)=>{
                                return (
                                    this.state.roomsSelected.users[user].userInfo.inRoom?<li onClick={this.userClickHandler}><a name={user}>{this.state.roomsSelected.users[user].userInfo.userName}</a></li>:null
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
                    <li className="nav-header">Contribute To These Rooms</li>
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

