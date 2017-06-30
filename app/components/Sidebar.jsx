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
                props.entities ? <button type="button" className="btn btn-primary center margin-bottom" onClick={ () => {
                    let selectedEntities = props.entities.entities.map(entity => {
                        return entity.normalized
                    })
                    console.log("entities sent to research", selectedEntities)
                    props.findResearchOnInput(selectedEntities)} }>Show Research</button> : null
            }
            {
                props.entities ?
                <ul className="nav">
                        <li className="entities-header">Entities:
                        <a href="#" data-tooltip="Entities are real-world objects, such as persons, locations, organizations, products, etc., that can be denoted with a proper name. These will be used to generate further research when you click the 'Show Research' button. You may click the red 'X' to remove a given entity from further research. Entities are also grouped in threes for more meaningful research relationships so you may click the blue up/down arrows to group the entities into threes."><span className="glyphicon glyphicon-info-sign tooltip">
                        </span>
                        </a>
                        </li>
                    {props.entities ? props.entities.entities.map((entity, i) => {
                        return (
                            <li key={`${i}`}><Link to="#">{`${entity.normalized}`}</Link>
                             {i !== 0 ? <span className="move"><span className="glyphicon glyphicon-arrow-up" aria-label="Click to move this entity up the list" onClick={() => props.moveEntityUp(i)}></span></span> : null}
                             {i !== props.entities.entities.length-1 ? <span className="move"><span className="glyphicon glyphicon-arrow-down" aria-label="Click to move this entity down the list" onClick={() => props.moveEntityDown(i)}></span></span> : null}
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
