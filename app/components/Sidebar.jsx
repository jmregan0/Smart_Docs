import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

class Sidebar extends React.Component {
// const topEntities = props.entities && [props.entities[0].mention, props.entities[1].mention, props.entities[2].mention]
    // console.log('top entities on props', props.entities)
    constructor() {
        super()
        this.state = {
            searchTags: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(evt) {
        evt.preventDefault()
        let tags = this.state.searchTags.join(', ').split(', ')
        this.props.findResearchOnInput(tags)
        console.log('tags', tags)
    }

    render() {
        console.log('this.state.searchTags', this.state.searchTags)
        return (
            <div className="col-sm-12 sidebar-nav-fixed pull-right">
                <div className="well">
                    <div className="search">
                        <div className="searchHeader">Add custom tags to research</div>
                        <form className="navbar-form" role="search" onSubmit={this.handleSubmit}>
                        <div className="input-group add-on">
                            <input className="form-control" placeholder="Enter tags" name="srch-term" id="srch-term" type="text" onChange={evt => this.setState({ searchTags: [evt.target.value] })}/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-plus" onClick={this.handleSubmit}></i></button>
                            </div>
                        </div>
                        </form>
                    </div>
                    {
                        this.props.entities ? <button type="button" className="btn btn-primary center margin-bottom" onClick={ () => {
                            let selectedEntities = this.props.entities.entities.map(entity => {
                                return entity.normalized
                            })
                            console.log("entities sent to research", selectedEntities)
                            this.props.findResearchOnInput(selectedEntities)
                            // this.props.sendSentiment(this.props.sentiment)
                        } }>Show Research</button> : null
                    }
                    {
                        this.props.entities ?
                        <ul className="nav">
                                <li className="entities-header">Entities:
                                <a href="#" data-tooltip="Entities are real-world objects, such as persons, locations, organizations, products, etc., that can be denoted with a proper name. These will be used to generate further research when you click the 'Show Research' button. You may click the red 'X' to remove a given entity from further research. Entities are also grouped in threes for more meaningful research relationships so you may click the blue up/down arrows to group the entities into threes."><span className="glyphicon glyphicon-info-sign tooltip">
                                </span>
                                </a>
                                </li>
                            {this.props.entities ? this.props.entities.entities.map((entity, i) => {
                                return (
                                    <li key={`${i}`}><Link to="#">{`${entity.normalized}`}</Link>
                                    {i !== 0 ? <span className="move"><span className="glyphicon glyphicon-arrow-up" aria-label="Click to move this entity up the list" onClick={() => this.props.moveEntityUp(i)}></span></span> : null}
                                    {i !== this.props.entities.entities.length-1 ? <span className="move"><span className="glyphicon glyphicon-arrow-down" aria-label="Click to move this entity down the list" onClick={() => this.props.moveEntityDown(i)}></span></span> : null}
                                    <span className="remove"><span className="glyphicon glyphicon-remove" aria-label="Click to remove this entity from cross-referenced research" onClick={() => this.props.removeEntity(i)}></span></span>

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
}

export default Sidebar
