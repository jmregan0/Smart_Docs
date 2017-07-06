import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Breadcrumb from './Breadcrumb';

import axios from 'axios'

const CollectedResources = (props) => {
  //console.log('research', props.researchResults.researchResults)

  $( ".ok" ).unbind().click(function() {
    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
  });

  return(
    <div>
      <Breadcrumb title={'Resources'} selection={'resource'} />
      <div className="alert-box success"><span className="glyphicon glyphicon-ok"></span>  Saved to your Bookmarks</div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Save?</th>
              <th>Data Type</th>
              <th>Title</th>
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
                {/*data.author = item.author[0].given +' '+ item.author[0].family*/}
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
                  <td><span className="glyphicon glyphicon-ok ok" aria-label="Click to save this research to your Bookmarks" onClick={() => props.saveBookmark(item)}></span></td>
                  <td>{data.type}</td>
                  <td>{data.title}</td>
                  {/*<td>{data.abstract || 'NA'}</td>*/}
                  <td>{data.publisher || 'Not Found'}</td>
                  {/*<td>{data.ISBN[0] || data.ISBN || 'NA'}</td>*/}
                  <td><a href={data.url}>{data.url}</a></td>
                </tr>
              )
            })
            : null
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CollectedResources
