import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

const CollectedResources = (props) => {
 console.log('research', props.researchResults.researchResults)

  return(

    <div id="wrapper">

        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html">SB Admin</a>
            </div>
            <ul className="nav navbar-right top-nav">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-envelope"></i> <b className="caret"></b></a>
                    <ul className="dropdown-menu message-dropdown">
                        <li className="message-preview">
                            <a href="#">
                                <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                                    <div className="media-body">
                                        <h5 className="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="message-preview">
                            <a href="#">
                                <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                                    <div className="media-body">
                                        <h5 className="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="message-preview">
                            <a href="#">
                                <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                                    <div className="media-body">
                                        <h5 className="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="message-footer">
                            <a href="#">Read All New Messages</a>
                        </li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bell"></i> <b className="caret"></b></a>
                    <ul className="dropdown-menu alert-dropdown">
                        <li>
                            <a href="#">Alert Name <span className="label label-default">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-primary">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-success">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-info">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-warning">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span className="label label-danger">Alert Badge</span></a>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <a href="#">View All</a>
                        </li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> John Smith <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li>
                            <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-envelope"></i> Inbox</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-gear"></i> Settings</a>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav side-nav">
                    <li>
                        <a href="index.html"><i className="fa fa-fw fa-dashboard"></i> Dashboard</a>
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
        </nav>

        <div id="page-wrapper">

            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Tables
                        </h1>
                        <ol className="breadcrumb">
                            <li>
                                <i className="fa fa-dashboard"></i>  <a href="index.html">Dashboard</a>
                            </li>
                            <li className="active">
                                <i className="fa fa-table"></i> Tables
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="row">

                            <div className="col-lg-12">
                                <h2>Collected Research Based on Your Keywords</h2>
                                <div className="alert-box success fadeout">Saved to your Bookmarks
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Save?</th>
                                                <th>Data Type</th>
                                                <th>Title</th>
                                                {/*<th>Abstract</th>*/}
                                                <th>Author</th>
                                                <th>Publisher</th>
                                                {/*<th>ISBN</th>*/}
                                                {/*<th>Publication Date</th>*/}
                                                <th>URL/Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                {
                    props.researchResults ? props.researchResults.researchResults.map((item, index) => {
                        let data = {}

                        if(item.type === 'book'){
                            data.type = 'Book';
                            data.title = item.title[0];
                            data.author = item.author[0].given +' '+ item.author[0].family
                            data.abstract = item.abstract;
                            data.publisher = item.publisher;
                            {/*data.publicationDate = item.published-print;*/}
                            data.url = item.URL;

                        } else if(item.type === 'journal-article'){
                            data.type = 'Journal Article';
                            data.title = item.title[0];
                            data.author = item.author[0].given +' '+ item.author[0].family
                            data.publisher = item.publisher;
                            {/*data.publicationDate = item.published-print;*/}
                            data.url = item.URL;

                        } else if(item.type === 'book-chapter'){
                            data.type = 'Book Chapter';
                            data.title = item.title[0];
                            data.location = item.page;
                            data.ISBN = item.ISBN;
                            data.publisher = item.publisher;
                            {/*data.publicationDate = item.published-print;*/}
                            data.url = item.URL;

                        } else if(item.type === 'reference-entry'){
                            data.type = 'Reference Entry';
                            data.title = item.title[0];
                            data.publisher = item.publisher;
                            {/*data.publicationDate = item.issued.date-parts[0];*/}
                            data.url = item.URL;

                        } else if(item.type === 'dataset'){
                            data.type = 'Dataset';
                            data.title = item.title[0];
                            data.publisher = item.publisher;
                            {/*data.publicationDate = item.issued.date-parts[0];*/}
                            data.url = item.URL;

                        } else if(item.type === 'dissertation'){
                            data.type = 'Dissertation';
                            data.title = item.title[0];
                            data.author = item.author[0].given + ' ' + item.author[0].family
                            data.publisher = item.publisher;
                            {/*data.publicationDate = item.issued.date-parts[0];*/}
                            data.url = item.URL;
                        }

                        return (
                            <tr key={'' + index}>
                                <td><span className="ok"><span className="glyphicon glyphicon-ok" aria-label="Click to save this research to your Bookmarks" onClick={() => props.saveBookmark(item)}></span></span></td>
                                <td>{data.type}</td>
                                <td>{data.title}</td>
                                {/*<td>{data.abstract || 'NA'}</td>*/}
                                <td>{data.author || 'Not Found'}</td>
                                <td>{data.publisher || 'Not Found'}</td>
                                {/*<td>{data.ISBN[0] || data.ISBN || 'NA'}</td>*/}
                                <td><a>{data.url}></a></td>
                            </tr>
                        )
                    })
                    : null
                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CollectedResources
