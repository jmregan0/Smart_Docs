import React from 'react';
import ReactDOM from 'react-dom';

export default class Sidebar extends React.Component {
  constructor(){
    super();
    this.state={}
  }

    render(){

        return(

            <div class="col-md-3">
                <div class="sidebar-nav-fixed pull-right affix">
                    <div class="well">
                        <ul class="nav ">
                            <li class="nav-header">Sidebar</li>
                            <li class="active"><a href="#">Link</a>
                            </li>
                            <li><a href="#">Link</a>
                            </li>
                            <li><a href="#">Link</a>
                            </li>
                            <li><a href="#">Link</a>
                            </li>
                            <li class="nav-header">Sidebar</li>
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
                            <li class="nav-header">Sidebar</li>
                            <li><a href="#">Link</a>
                            </li>
                            <li><a href="#">Link</a>
                            </li>
                            <li><a href="#">Link</a>
                            </li>
                        </ul>
                    </div>
          
                </div>
          
            </div>

        )

    }  
}
