import React from 'react';
import {Link} from 'react-router';

export default class ResearchTableResearch extends React.Component {





  render() {
    const research = this.props.research || [];

    return (
      <div className="col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><i className="fa fa-paper-plane-o fa-fw"></i> Retrieved Research Digest</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th> Source #</th>
                    <th>Resource Name</th>
                    <th>Type</th>
                    <th>Relevance to Text</th>
                  </tr>
                </thead>
                <tbody>
                  {research.map((item, index) => {
                      var title = item.title[0].slice(0,50) + '...'
                      return (
                        <tr key={title}>
                          <td>{index + 1}</td>
                          <td>{title}</td>
                          <td>{item.type}</td>
                          <td>{Math.floor(item.score) + "%"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="text-right">
              <Link to="bulk-found-research">View Research Detail <i className="fa fa-arrow-circle-right"></i></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
