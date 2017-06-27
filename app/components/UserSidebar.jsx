import React from 'react';
import ReactDOM from 'react-dom';

export default class UserSidebar extends React.Component {
  constructor(){
    super();
    this.state={}
  }

    render(){

        return(

            <div className="sidebar-nav-fixed pull-left">
                <div className="well">

                    <ul className="nav ">
                        <li id="main-user-head" className="nav-header"><a href="#">Own User (Username)</a></li>
                        <li className="active"><a href="#">User 1</a>
                        </li>
                        <li><a href="#">User 2</a>
                        </li>
                    </ul>
                </div>
            </div>
        )

    }  
}

