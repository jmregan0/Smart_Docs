import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

const Sidebar = (props) => {
console.log('props',props)
return(

    <div className="col-sm-12 sidebar-nav-fixed pull-right">
        <div className="well">
            <button onClick={ () => {console.log('clicked');  props.findResearchOnInput(['climate change', 'ice caps'])}}>Take me to my Research</button>
            <ul className="nav ">
                <li className="nav-header">Entities</li>
                {props.entities ? props.entities.entities.map(entity => {
                    return (
                        <li key={`${entity.entityId}`}><a href="#">{`${entity.normalized}`}</a>
                        </li>
                    )
                }) : null}

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

export default Sidebar
