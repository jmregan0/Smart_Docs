import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

export default class Sentimentbar extends React.Component {
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
    if (this.props.sentiment.nlpSentiment) {
      $('.chart span').css({"width" : "0"}).parent().each(function(i){
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
    } else {
      $('.chart span').css({"width" : "0"}).parent().each(function(i){
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
    let temp = this.props.sentiment.nlpSentiment ? Math.round(this.props.sentiment.nlpSentiment.document.confidence*100) : 10;
    console.log("temp",temp);

    return(

      <div className="skills">
        <div data-label="Sentiment" data-level={temp} className="chart"><span></span><p>{temp}</p></div>
      </div>

    )
  }
}
