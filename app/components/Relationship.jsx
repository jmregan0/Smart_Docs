import React from 'react'
import { Link } from 'react-router'

const Relationships = (props) => {

const relationships = props.nlpRelationships

  return (
          <div className="row">
            <div className="col-lg-8">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Probable Relationships in Your Text
                    </div>
                    <div className="panel-body">
                        <div className="panel-group" id="accordion">

                        {
                          props.nlpRelationships !== undefined ? relationships.map((item,index) => {

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
                          :
                          <div className="panel panel-default">
                                  <div className="panel-heading">
                                      <h4 className="panel-title">
                                          <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">No Relationships Detected</a>
                                      </h4>
                                  </div>
                                  <div id={"collapse"+place[index]} className="panel-collapse collapse in">
                                      <div className="panel-body">
                                          Our Natural Language Processor did not detect any obvious relation between entities in your text.
                                      </div>
                                  </div>
                              </div>
                        }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Relationships

