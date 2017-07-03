import React from 'react';
import {Link} from 'react-router';

const Breadcrumb = (props) => {
  const selection = props.selection || 'resources';
  const title = props.title || '';

  return (
    <div className="row">
        <div className="col-lg-12">
            <h1 className="page-header">
            <small>{title}</small>
            </h1>
            <ol className="breadcrumb">
                <li>
                    <i className="fa fa-chevron-left"></i>  <Link to="/research">Dashboard</Link>
                </li>
                <Crumb selection={selection} />
            </ol>
        </div>
    </div>
  );
}

export default Breadcrumb;

const Crumb = (props) => {
  switch(props.selection){
    case 'sentiment':
      return (
        <li className="active">
          <i className="fa fa-smile-o"></i> Sentiment
        </li>
      )
    case 'relationship':
      return (
        <li className="active">
          <i className="fa fa-connectdevelop"></i> Relationship
        </li>
      )
    case 'entity':
      return (
        <li className="active">
          <i className="fa fa-tasks"></i> Entity
        </li>
      )
    case 'resource':
      return (
        <li className="active">
          <i className="fa fa-book"></i> Resources
        </li>
      )
    default:
      return null;
  }
}

