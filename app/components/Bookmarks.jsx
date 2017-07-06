import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumb from './Breadcrumb'

const Bookmarks = (props) => {
  console.log('props.bookmarks', props.bookmarks)
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Remove?</th>
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
          props.bookmarks ? props.bookmarks.map((item, index) => {
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
                <td><span className="glyphicon glyphicon-remove remove" aria-label="Click to remove this research from your Bookmarks" onClick={() => props.removeBookmark(index)}></span></td>
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
  )
}

export default Bookmarks

// export default class Carousel extends React.Component {
//   constructor(){
//     super();
//     this.state={links: {list:["http://en.wikipedia.org/", "https://en.wikipedia.org/wiki/JavaScript", "https://en.wikipedia.org/wiki/Chicago"],
//                         selected:"http://en.wikipedia.org/"}}

//     this.onClickhandler=this.onClickhandler.bind(this)
//   }

//   onClickhandler(){
//     //change selected
//   }


//   render(){

// //iframe will be passed in linked to site
//     return(
//           <div className="col-sm-12">

//             <div className="col-sm-12">
//               <div className="col-sm-8">
//                 <div className="box"><iframe src={this.state.links.selected} width = "100%" height = "500px"></iframe></div>
//               </div>
//               <div className="col-sm-4">
//                 <img src="https://i-msdn.sec.s-msft.com/dynimg/IC443904.jpeg" width = "100%" alt="Paris"></img>
//                 <div>Relevance Chart</div>
//               </div>
//             </div>
//           </div>
//     )
//   }
// }
