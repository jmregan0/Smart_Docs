import React from 'react';
import ReactDOM from 'react-dom';

export default class RoomSidebar extends React.Component {
    constructor(){
        super();
        this.state={value:''}

        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleFormChange=this.handleFormChange.bind(this)
    }

    handleSubmit(event){
        console.log(this.state.value)
        event.preventDefault()
    }

    handleFormChange(event){
        this.setState({value: event.target.value});
    }

    render(){

        return(

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
                    <li className="active"><a href="#">Room 1</a>
                    </li>
                    <li><a href="#">Room 2</a>
                    </li>
                </ul>
                </div>
            </div>
        )

    }  
}

