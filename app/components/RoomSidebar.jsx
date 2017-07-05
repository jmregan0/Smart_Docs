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
                    refRoom:null,
                    submitDisabled:true,
                    isValidationError:false,
                    filter:'',
                    filteredList:{}
                 }

        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.roomClickHandler = this.roomClickHandler.bind(this)
        this.backToRoomsClickHandler = this.backToRoomsClickHandler.bind(this)
        this.userClickHandler = this.userClickHandler.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
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

    handleFilterChange(event){
        this.setState({filter: event.target.value})
        this.filterList(event.target.value)
    }

    filterList(filter){
        var obj={}
        var arr = Object.keys(this.state.roomsList).filter((key)=>{
            filter=filter.toLowerCase()
            key=key.toLowerCase()
            return (key.startsWith(filter))
        })
        
        arr.forEach((key)=>{
            obj[key]=this.state.roomsList[key]
        })
        this.setState({filteredList:obj})
    }

    userClickHandler(event){
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

    roomClickHandler(event){
        var name = event.target.name;
        this.setState({isValidationError:false}) 

        store.dispatch(setCurrentUser({uid:"", name:name}))       
        var userName=this.state.self.name
        var userUid = this.state.self.uid
        //set selected room
        this.props.fireRefRoom.child(name).child('users').on('value', data=>{
            this.setState({roomsSelected: {rid:name, name:name, users:data.val()}})
        });
        this.setState({setSelectedRoomFirebase:name},()=>{
            this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').transaction((currentData)=>{
            this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').onDisconnect().set({userName:userName, uid:userUid, inRoom:false}) 
                if(currentData===null){
                    return {userName:userName, uid:userUid, inRoom:true} 
                }else{
                    this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').set({userName:userName, uid:userUid, inRoom:true})
                }
            })
        })
        this.setState({inRoom:true})
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
            this.setState({setSelectedRoomFirebase:name}, ()=>{
                    this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').onDisconnect().set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:false})
                    this.props.fireRefRoom.child(name).child('users').on('value', data=>{
                        console.log({roomsSelected: {rid:name, name:name, users:data.val()}})
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

            )
            this.setState({inRoom:true})
        }
    }

    componentDidMount(){
        //load all rooms,
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
                if(this.state.roomsSelected.name){
                    this.props.fireRefRoom.child(this.state.roomsSelected.name).child('users').child(this.state.self.uid).child('userInfo').set({userName:this.state.self.name, uid:this.state.self.uid, inRoom:false})
                }
                this.setState({self: {uid:user.uid, name:name}, inRoom:false, roomsSelected: {name:"", rid:"", users:{}}}, ()=>{
                })
            }

        })
    }

    render(){
        var bool=this.state.inRoom
        var roomsList = this.state.filter?this.state.filteredList:this.state.roomsList 
        return(
        <div className="col-sm-12">
        {
            bool?
            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                    <ul className="nav ">
                        <li onClick={this.backToRoomsClickHandler}><a href="#">Back to Topics</a></li>
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
            :
            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                <form onSubmit={this.handleSubmit}>
                  <h5 className="nav-header">Create Topic:<br/></h5>
                  <input type="text" name="firstname" value={this.state.value} onChange={this.handleFormChange}/>
                  <br/>
                  <input id="sub-btn" className="btn btn-primary" type="submit" value="Submit" disabled={this.state.submitDisabled}/>
                </form>
                <form>
                     <h5 className="nav-header">Filter Topic:<br/></h5>
                    <input type="text" name="filter" value={this.state.filter} onChange={this.handleFilterChange}/>
                </form>
                {this.state.isValidationError?<h5>{this.state.isValidationError}</h5>:null}
                <ul className="nav ">
                    <h5 className="nav-header">List of Topics<br/></h5>
                    {
                        roomsList?Object.keys(roomsList).map((room)=>{
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

