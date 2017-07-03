import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'APP/fire'
import store from '../store'
import {setCurrentUser} from '../action-creators/users'
import {browserHistory } from 'react-router';

export default class RoomSidebar extends React.Component {
    constructor(){
        super();
        this.state={
                    setSelectedRoomFirebase:false,
                    roomsList: {},
                    roomsSelected: {name:"", rid:"", users:{}},
                    self:{uid:"", name:""},
                    refRoom:null,
                    isValidationError:false,
                    filter:'',
                    filteredList:{}
                 }

        this.roomClickHandler = this.roomClickHandler.bind(this)
        this.backToRoomsClickHandler = this.backToRoomsClickHandler.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
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
            // this.props.fireRefRoom.child(name).child('users').off()
        });

        //fix

        // console.log(" disconnecting from", name)

        // this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').set({userName:userName, uid:userUid, inRoom:true})

        // this.props.fireRefRoom.child(name).child('users').child(this.state.self.uid).child('userInfo').onDisconnect().set({userName:userName, uid:userUid, inRoom:false}) 

        browserHistory.push("/edison/"+name)
        this.setState({inRoom:true})

    }

    

    componentDidMount(){
        //load all rooms,
        console.log(this.props.room)


        this.props.fireRefRoom.once('value', data=>{

            this.setState({roomsList:data.val()})
            // if(this.props.room&&this.props.room!=="welcome"){
            //     if(data.val()[this.props.room]){
            //         console.log("iring in component did mount in roomsidebar",data.val()[this.props.room] )
            //         this.setState({roomsSelected:{rid:this.props.room, name:this.props.room, users:data.val()[this.props.room].users}})
            //     }
            // }
            
            // console.log("roomsList", data.val())
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


        var roomsList = this.state.filter?this.state.filteredList:this.state.roomsList 

        return(
        <div className="col-sm-12">

            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
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

        </div>

        )

    }
}

