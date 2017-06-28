import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

const Sidebar = (props) => {
// const topEntities = props.entities && [props.entities[0].mention, props.entities[1].mention, props.entities[2].mention]
console.log('top entities on props', props.entities)

return(

    <div className="col-sm-12 sidebar-nav-fixed pull-right">
        <div className="well">
            {
                props.entities ? <button onClick={ () => { props.findResearchOnInput([props.entities.entities[0].mention, props.entities.entities[1].mention])} }>Take me to my Research</button> : null
            }
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
