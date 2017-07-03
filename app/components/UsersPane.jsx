import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'APP/fire'
import store from '../store'
import {setCurrentUser} from '../action-creators/users'


export default class UsersPane extends React.Component {
    constructor(){
        super();
        this.state={
                    setSelectedRoomFirebase:false,
                    roomsList: {},
                    roomsSelected: {name:"", rid:"", users:{}},
                    self:{uid:"", name:""},
                    inRoom:false,
                    refRoom:null,

                 }

        this.userClickHandler = this.userClickHandler.bind(this)
       
    }

    userClickHandler(event){
        // console.log("this is rid", this)
        store.dispatch(setCurrentUser({uid:event.target.name, name:this.state.roomsSelected.rid}))

    }

    componentDidMount(){
        //load all rooms,
        console.log("this should be the room", this.props.room)

        firebase.auth().onAuthStateChanged((user)=> {
            if(user){

                var name = user.email?user.email:"anon"

                if(this.state.roomsSelected.name){
                    this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).child('userInfo').set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:false})
                }

                this.setState({self: {uid:user.uid, name:name}}, ()=>{
                    // this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).set({userName:this.state.self.name, inRoom:false})
                    this.props.fireRefRoom.child(this.props.room).child('users').child(this.state.self.uid).child('userInfo').onDisconnect().set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:false})
                    this.props.fireRefRoom.child(this.props.room).child('users').child(this.state.self.uid).child('userInfo').set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:true})
                    this.props.fireRefRoom.once('value', data=>{

                        this.setState({roomsList:data.val()})
                        console.log("this is some stuff", data.val()[this.props.room])
                        this.setState({roomsSelected: {rid:this.props.room, name:this.props.room, users:data.val()[this.props.room].users}})

                    })

                    this.props.fireRefRoom.on('value', data=>{

                        this.setState({roomsList:data.val()})
                        // console.log("update before fire", this.state.setSelectedRoomFirebase)
                        this.setState({roomsSelected: {rid:this.props.room, name:this.props.room, users:data.val()[this.props.room].users}})

                    })
                })

            }

        })
    }

    render(){
        console.log("this stuff before render", this.state.roomsSelected)
        return(
        <div className="col-sm-12">
        <h1>this is the users pane</h1>

            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                    <ul className="nav ">
                       
                        <li id="main-user-head" className="nav-header">Current Topic - {this.state.roomsSelected.rid}</li>
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

        </div>

        )

    }
}

