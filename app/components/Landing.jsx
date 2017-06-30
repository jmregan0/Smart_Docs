import React from 'react'
import { Link } from 'react-router'

const Landing = () => {
  return (
    <div>
      <header className="intro">
        <div className="intro-body">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <h1 className="brand-heading">SmartDocs</h1>
                <p className="intro-text">Change the way you write.<br/>Forever.</p>
                <a href="#about" className="btn btn-circle page-scroll"><i className="fa fa-angle-double-down animated"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="container content-section">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
              <h2 className="text-center">About <span className="bold">SmartDocs</span></h2>
              <p>SmartDocs is a collaborative document editor with Edison, an integrated research assistant.</p>
              <p>As you type, Edison parses your document for important entities. You can add and remove entities and when you're ready, Edison will perform research based on those entities. You can save research results you like and ignore the rest.</p>
              <p>Edison will also find relationships between entities and perform a sentiment analysis on individual entities and your document as a whole.</p>
              <p>You can also create rooms for other team members who are writing about the same subject and even do analysis on their docs.</p>
              <p>Try it for yourself and see if it will change the way you write.</p>
          </div>
        </div>
      </section>

      <section id="download" className="content-section text-center">
        <div className="download-section">
          <div className="container">
            <div className="col-lg-8 col-lg-offset-2">
              <h2>Try it now</h2>
              <p>Start writing a document to get a feel for how SmartDocs works.</p>
              <a href="/demos/draftjsscratchpad/welcome" className="btn btn-default btn-lg">Start SmartDocs</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="container content-section text-center">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <h2>Contact Team SmartDocs</h2>
            <p>Feel free to email us to provide some feedback on SmartDocs, give us suggestions for new features, or to just say hello!</p>
            <p><a href="mailto:feedback@smartdocs.com">feedback@smartdocs.com</a>
            </p>
            <ul className="list-inline banner-social-buttons">
              <li>
                <a href="https://twitter.com/smartdocs" className="btn btn-default btn-lg"><i className="fa fa-twitter fa-fw"></i> <span className="network-name">Twitter</span></a>
              </li>
              <li>
                <a href="https://github.com/jmregan0/Smart_Docs" className="btn btn-default btn-lg"><i className="fa fa-github fa-fw"></i> <span className="network-name">Github</span></a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer>
        <div className="container text-center">
          <p>Copyright &copy; SmartDocs LLC 2017</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
