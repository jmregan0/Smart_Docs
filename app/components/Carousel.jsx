import React from 'react';
import ReactDOM from 'react-dom';

export default class Carousel extends React.Component {
  constructor(){
    super();
    this.state={links: {list:["http://en.wikipedia.org/", "https://en.wikipedia.org/wiki/JavaScript", "https://en.wikipedia.org/wiki/Chicago"],
                        selected:"http://en.wikipedia.org/"}}
    
    this.onClickhandler=this.onClickhandler.bind(this)
  }

  onClickhandler(){
    //change selected
  }


  render(){

//iframe will be passed in linked to site
    return(
          <div className="col-sm-12">
            <div className="col-sm-12">
              <button className="col-sm-1">Left</button>
              <a href={this.state.links.selected} id="iframeLink" className="col-sm-10">Go to {this.state.links.selected}</a>
              <button className="col-sm-1 pull-right">Right</button>
            </div>

            <div className="col-sm-12">
              <div className="col-sm-8">
                <div class="box"><iframe src={this.state.links.selected} width = "100%" height = "500px"></iframe></div>
              </div>
              <div className="col-sm-4">
                <img src="https://i-msdn.sec.s-msft.com/dynimg/IC443904.jpeg" width = "100%" alt="Paris"></img>
                <div>Relevance Chart</div>
              </div>
            </div>
          </div>
    )
  }
}
