import React from 'react'
import firebase from 'APP/fire'
import SidebarContainer from '../../app/containers/SidebarContainer'
import SentimentometerContainer from '../../app/containers/SentimentometerContainer'
import RoomEditorContainer from '../../app/containers/RoomEditorContainer'
import PeerContentsContainer from '../../app/containers/PeerContentsContainer'
import DraftjsScratchpad from './DraftjsScratchpad'
import RoomSidebar from '../../app/components/RoomSidebar'
import UserSidebar from '../../app/components/UserSidebar'
import store from '../../app/store'
import { connect } from 'react-redux'
const db = firebase.database()
    , auth = firebase.auth()

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    
    console.log("-------------nextProps.users", nextProps)
  }

  render(){
    console.log("this.props", this.props)
    return(  <div>
    <h1>{this.props.room}</h1>
    {/* Here, we're passing in a Firebase reference to
        /scratchpads/$scratchpadTitle. This is where the scratchpad is
        stored in Firebase. Each scratchpad is just a string that the
        component will listen to, but it could be the root of a more complex
        data structure if we wanted. */}
    <div className="col-sm-3">
      <RoomSidebar fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
    </div>
    <div className="col-sm-6">
      <div className="col-sm-12">
        <DraftjsScratchpad fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms').child(this.props.room)}/>
      </div>
    </div>
    <div className="col-sm-3">
      {/*sentiment bar is passed level 0-100*/}
      <SentimentometerContainer />
      <SidebarContainer/>
    </div>
    <div className="col-sm-6">
      <RoomEditorContainer fireRefRoom={db.ref('rooms')} />
    </div>
    <div className="col-sm-6">
      <PeerContentsContainer fireRefRoom={db.ref('rooms')} />
    </div>
  </div>
      )
  }
}



//notes/userid-->notecontent
//rooms/roomid/userid

const mapState = ({users, nlpResults}) => ({
    nlpResults,
    users
});


const mapDispatch = (dispatch) => {
  return {
    findSentiment: (text) => dispatch(findSentiment(text)),
    findEntity: (text) => dispatch(findEntity(text)),
    findRelationships: (text) => dispatch(findRelationships(text)),
  }
}

export default connect(mapState, mapDispatch)(Index)