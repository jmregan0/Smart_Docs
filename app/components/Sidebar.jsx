import React from 'react';
import ReactDOM from 'react-dom';

export default class Sidebar extends React.Component {
  constructor(){
    super();
    this.state={}
  }

    render(){

        return(

            <div className="col-sm-12 sidebar-nav-fixed pull-right">
                <div className="well">
                    <ul className="nav ">
                        <li className="nav-header">Sidebar Category #1</li>
                        <li className="active"><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li className="nav-header">Sidebar Category #1</li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li className="nav-header">Sidebar Category #1</li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                        <li><a href="#">Link</a>
                        </li>
                    </ul>
                </div>
            </div>
        )

    }  
}
