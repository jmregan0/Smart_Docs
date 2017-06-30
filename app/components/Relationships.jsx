import React from 'react'
import { Link } from 'react-router'

const Relationships = (props) => {

const relationships = props.nlpRelationships

  return (
      <div id="wrapper">

            <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav side-nav">
                    <li>
                        <Link to="/research"><i className="fa fa-fw fa-dashboard"></i> Dashboard</Link>
                    </li>
                    <li>
                        <a href="charts.html"><i className="fa fa-fw fa-bar-chart-o"></i> Charts</a>
                    </li>
                    <li className="active">
                        <a href="tables.html"><i className="fa fa-fw fa-table"></i> Tables</a>
                    </li>
                    <li>
                        <a href="forms.html"><i className="fa fa-fw fa-edit"></i> Forms</a>
                    </li>
                    <li>
                        <a href="bootstrap-elements.html"><i className="fa fa-fw fa-desktop"></i> Bootstrap Elements</a>
                    </li>
                    <li>
                        <a href="bootstrap-grid.html"><i className="fa fa-fw fa-wrench"></i> Bootstrap Grid</a>
                    </li>
                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i className="fa fa-fw fa-arrows-v"></i> Dropdown <i className="fa fa-fw fa-caret-down"></i></a>
                        <ul id="demo" className="collapse">
                            <li>
                                <a href="#">Dropdown Item</a>
                            </li>
                            <li>
                                <a href="#">Dropdown Item</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="blank-page.html"><i className="fa fa-fw fa-file"></i> Blank Page</a>
                    </li>
                    <li>
                        <a href="index-rtl.html"><i className="fa fa-fw fa-dashboard"></i> RTL Dashboard</a>
                    </li>
                </ul>
            </div>

            <div className="row">
              <div className="col-lg-8">
                  <div className="panel panel-default">
                      <div className="panel-heading">
                          Probable Relationships in Your Text
                      </div>
                      <div className="panel-body">
                          <div className="panel-group" id="accordion">

                          {
                            relationships ? relationships.map((item,index) => {

                              var place = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]

                              return (
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href={"#collapse"+place[index]}>{item.arg1}</a>
                                        </h4>
                                    </div>
                                    <div id={"collapse"+place[index]} className="panel-collapse collapse in">
                                        <div className="panel-body">
                                            <strong>{item.arg1}</strong> is likely related to <strong>{item.arg2}</strong> as a/an <strong>{item.predicate}</strong>
                                        </div>
                                    </div>
                                </div>
                              )
                            })
                            : null
                          }

                          </div>
                      </div>
                  </div>
              </div>
          </div>
       </div>
    )
}

export default Relationships

