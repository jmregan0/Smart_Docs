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
    this.state={inRoom:false}

  }

  componentWillReceiveProps(nextProps){
    
    console.log("-------------nextProps.users in index.jsx", nextProps.users.selected.name)
    if(nextProps.users.selected.name){
      this.setState({inRoom: nextProps.users.selected.name})
    }else{
      this.setState({inRoom:false})
    }
  }

  componentDidMount(){
    console.log(this.props)
    if(this.props.room){

    }
  }

  render(){
    console.log("this.props.room", this.props.room)
    var room = this.state.inRoom?this.state.inRoom:"welcome"

    return(
    <div>
      <h1>{room}</h1>
      <div className="col-sm-3">
        <SentimentometerContainer />
        <SidebarContainer/>
        <RoomSidebar room={this.props.room} fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
      </div>
      {/* Here, we're passing in a Firebase reference to
          /scratchpads/$scratchpadTitle. This is where the scratchpad is
          stored in Firebase. Each scratchpad is just a string that the
          component will listen to, but it could be the root of a more complex
          data structure if we wanted. */}
      <div className="col-sm-9 col-xs-12">
        {
          !this.state.inRoom?
          <div>
            <div className="col-sm-12">
              <DraftjsScratchpad fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms').child(this.props.room)}/>
            </div>
          </div>
          :
          <div>
            <div className="col-sm-6">
              <RoomEditorContainer fireRefRoom={db.ref('rooms')} />
            </div>
            <div className="col-sm-6">
              <PeerContentsContainer fireRefRoom={db.ref('rooms')} />
            </div>
          </div>
        }
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