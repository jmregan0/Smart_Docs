import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'APP/fire'
import store from '../store'
import {setCurrentUser} from '../action-creators/users'
import {browserHistory } from 'react-router';

export default class TopicsList extends React.Component {
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
        if(this.state.roomsList){
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
        browserHistory.push("/edison/"+name)
        this.setState({inRoom:true})
    }

    componentDidMount(){

        this.props.fireRefRoom.once('value', data=>{
            this.setState({roomsList:data.val()})
        })

        this.props.fireRefRoom.on('value', data=>{
            this.setState({roomsList:data.val()})
            if(this.state.setSelectedRoomFirebase){
                var newStatePrime = Object.assign(this.state, {roomsSelected: {rid:this.state.setSelectedRoomFirebase, name:this.state.setSelectedRoomFirebase, users:data.val()[this.state.setSelectedRoomFirebase].users}})
                this.setState(newStatePrime)
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

    componentWillUnmount(){
        this.props.fireRefRoom.off()
    }

    render(){
        var roomsList = this.state.filter?this.state.filteredList:this.state.roomsList
        return(
        <div className="col-sm-12">
            <div className="sidebar-nav-fixed pull-left">
                <div className="well">
                    <div className="filter-line">
                        <form>
                            <h5 className="nav-header">Filter Topic:<br/></h5>
                            <input type="text" name="filter" value={this.state.filter} onChange={this.handleFilterChange}/>
                        </form>
                    </div>
                    {this.state.isValidationError?<h5>{this.state.isValidationError}</h5>:null}
                    <ul className="nav ">
                        <h5 className="nav-header">List of Topics:<br/></h5>
                        {
                            roomsList?Object.keys(roomsList).map((room)=>{
                                return(
                                        <li key={room}><a name={room} onClick={this.roomClickHandler}>{room}</a></li>
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

