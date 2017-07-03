import React from 'react';
import {Link} from 'react-router';

export default class ResearchTableWriting extends React.Component {





  render() {
    const sentiment = this.props.sentiment;

    return (
      <div className="col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><i className="fa fa-linode fa-fw"></i> Breakdown of Writing </h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th> People </th>
                  </tr>
                </thead>
                <tbody>
                  {
                  sentiment.length ? sentiment.map((item, index) => {
                    if(item.type === 'PERSON'){
                      return (
                        <tr key={index}>
                          <td>{item.normalized}</td>
                        </tr>
                      )
                    }
                  })
                  : null
                  }
                <br/>
                <thead>
                  <tr>
                    <th> Places </th>
                  </tr>
                </thead>

                  {
                    sentiment.length ? sentiment.map((item, index) => {
                    if(item.type === 'LOCATION'){
                      return (
                        <tr key={index}>
                          <td>{item.normalized}</td>
                        </tr>
                      )
                    }
                  })
                  : null
                  }
                <br/>
                <thead>
                  <tr>
                    <th> Organizations </th>
                  </tr>
                </thead>

                  {
                    sentiment.length ? sentiment.map((item, index) => {
                    if(item.type === 'ORGANIZATION'){
                      return (
                        <tr key={index}>
                          <td>{item.normalized}</td>
                        </tr>
                      )
                    }
                  })
                  : null
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
