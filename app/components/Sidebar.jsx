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
                props.entities ? <button type="button" className="btn btn-primary center margin-bottom" onClick={ () => { props.findResearchOnInput([props.entities.entities[0].mention, props.entities.entities[1].mention])} }>Take me to my Research</button> : null
            }
            {
                props.entities ?
                <ul className="nav">
                    <li className="nav-header">Entities:</li>
                    {props.entities ? props.entities.entities.map((entity, i) => {
                        return (
                            <li key={`${i}`}><Link to="#">{`${entity.normalized}`}</Link>
                             <span className="remove"><span className="glyphicon glyphicon-remove" aria-label="Click to remove this entity from cross-referenced research" onClick={() => props.removeEntity(i)}></span></span>

                            </li>
                        )
                    }) : null}
                </ul>
                : <div>No entities yet. Compose your document for entity analysis.</div>
            }
        </div>
    </div>
  )
}

export default Sidebar
