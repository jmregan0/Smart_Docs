import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

export default class SentimentometerEntity extends React.Component {
  constructor(props){
    super(props);
    this.state={level: "10"}

    this.onClickhandler=this.onClickhandler.bind(this)
  }

  onClickhandler(){
    //change selected
  }

  componentDidMount(){
    this.gage();
  }

  componentDidUpdate(){
    this.gage();
  }

  gage(){
    if (this.props.polarity === 'neg') {
      console.log('neg polarity', this.props.polarity)
      $('.chart span').css({"background-color" : "#db524b", "width" : "0"}).closest().each(function(i){
        // Loop through .gage elements
        $('p', this).html($(this).attr("data-label"));
        // Set p html value to the data-label attr set in the element
        var timeout = parseInt(i) * 60 + 1100;
        // Set a timeout based on the iteration multiplied by 60 (will affect delay between animations)
        $('span', this).delay(timeout).animate({"opacity" : "1"}, 0, function(){
          //Delay
          $(this).css({"width" : $(this).parent().attr("data-level") + "%"});
        });
      });
    } else if (this.props.polarity === 'neu') {
      console.log('neu polarity', this.props.polarity)
      $('.chart span').css({"background-color" : "#b2b2b3", "width" : "0"}).closest().each(function(i){
        // Loop through .gage elements
        $('p', this).html($(this).attr("data-label"));
        // Set p html value to the data-label attr set in the element
        var timeout = parseInt(i) * 60 + 1100;
        // Set a timeout based on the iteration multiplied by 60 (will affect delay between animations)
        $('span', this).delay(timeout).animate({"opacity" : "1"}, 0, function(){
          //Delay
          $(this).css({"width" : $(this).parent().attr("data-level") + "%"});
        });
      });
    }
    else if (this.props.polarity === 'pos') {
      console.log('pos polarity', this.props.polarity)
      $('.chart span').css({"background-color" : "#54b253", "width" : "0"}).closest().each(function(i){
        // Loop through .gage elements
        $('p', this).html($(this).attr("data-label"));
        // Set p html value to the data-label attr set in the element
        var timeout = parseInt(i) * 60 + 1100;
        // Set a timeout based on the iteration multiplied by 60 (will affect delay between animations)
        $('span', this).delay(timeout).animate({"opacity" : "1"}, 0, function(){
          //Delay
          $(this).css({"width" : $(this).parent().attr("data-level") + "%"});
        });
      });
    }
  }

  render(){
    let confidence = this.props.confidence ? Math.round(this.props.confidence) : 0;
    console.log("confidence", confidence);
    console.log("polarity", this.props.polarity);

    return(

      <div className="skills">
        {this.props.confidence ? <div id={this.props.index} data-label="Sentiment" data-level={this.props.confidence} className="chart"><span></span><p>{confidence}</p></div> :
      <div className="sentimeter">No entity sentiment</div>}
      </div>

    )
  }
}
