import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router'

const Sentiment = (props) => {
  console.log('sentimentResults', props.sentimentResults)
  return(
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
          <th className="bg-primary">Sentiment</th>
          <th className="bg-primary">Entity</th>
          <th className="bg-primary">Value</th>
          </tr>
        </thead>
        <tbody>
        {
          props.sentimentResults.entities ? props.sentimentResults.entities.map((item, index) => {
            let value = 0
            let entity = item.normalized
            let rawNumber = item.sentiment.confidence
            let number = Math.round(rawNumber*100)
            let polarity = item.sentiment.label
            polarity === 'pos' ? value = "+" + number : polarity === 'neg' ? value = "-" + number : value = number

            return (
            <tr key={index}>
              <td>{polarity === 'pos' ? <div className="progress"><div className="progress-bar bg-success" style={{width: number + '%'}} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">{value}</div></div> : polarity === 'neg' ? <div className="progress"><div className="progress-bar bg-danger" style={{width: number + '%'}} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">{value}</div></div> : <div className="progress"><div className="progress-bar bg-neutral" style={{width: value + '%'}} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">{value}</div></div>}</td>
              <td>{entity}</td>
              <td>{value}</td>
            </tr>
            )
          })
          : null
        }
        </tbody>
      </table>
    </div>
  )
}

export default Sentiment
