import React from 'react';
import {Link} from 'react-router';

export default class ResearchTableWriting extends React.Component {





  render() {
    const sentiment = this.props.sentiment;
    let sorted = {};

    sentiment.forEach(item=>{
      if(!sorted[item.type]) sorted[item.type] = [];
      sorted[item.type].push(item.normalized);
    });

    const keys = Object.keys(sorted);

    return (
      <div className="col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><i className="fa fa-linode fa-fw"></i> Entity Categories </h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              {keys.map( (type)=>
                <EntityTable key={'ResearchTableWriting-'+type} title={type} entities={sorted[type]} />
              )}
            </div>
            <div className="text-right">
              <Link to="/research/entity">View Research Detail <i className="fa fa-arrow-circle-right"></i></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EntityTable = ({title,entities}) => 
  <table className="table table-bordered table-hover table-striped">
    <thead>
      <tr>
        <th>{title}</th>
      </tr>
    </thead>
    <tbody>
      {entities.map(entity=>
        <tr key={'ResearchTableWriting-'+entity}>
          <td>{entity}</td>
        </tr>
      )}
    </tbody>
  </table>
