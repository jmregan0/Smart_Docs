import React from 'react'
import { connect } from 'react-redux'
import Bookmarks from '../components/Bookmarks'
import Breadcrumb from '../components/Breadcrumb'
import { removeBookmark } from '../action-creators/research'

const BookmarksContainer = (props) => {
	return (
    <div>
      <Breadcrumb title={'Bookmarks'} selection={'bookmark'} />
      <Bookmarks
				bookmarks={props.bookmarks}
				removeBookmark = {props.removeBookmark}/>
    </div>
  );
}

const mapState = (state) => {
	console.log('state.researchResults', state.researchResults)
	return {
		bookmarks: state.researchResults.bookmarks
	}
}

const mapDispatch = (dispatch) => {
  return {
		removeBookmark: (item) => dispatch(removeBookmark(item))
  }
}

export default connect(mapState, mapDispatch)(BookmarksContainer)
