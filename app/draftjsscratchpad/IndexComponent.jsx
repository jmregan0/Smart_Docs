
import React from 'react'
import firebase from 'APP/fire'
import SidebarContainer from '../containers/SidebarContainer'
import SentimentometerContainer from '../containers/SentimentometerContainer'
import RoomEditorContainer from '../containers/RoomEditorContainer'
import PeerContentsContainer from '../containers/PeerContentsContainer'
import DraftjsScratchpad from './DraftjsScratchpad'
import UsersPane from '../components/UsersPane'
import UserSidebar from '../components/UserSidebar'
import store from '../store'
import { connect } from 'react-redux'
const db = firebase.database()
    , auth = firebase.auth()

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state={inRoom:false}

  }

  componentWillReceiveProps(nextProps){
        if(nextProps.users.selected.name){
      this.setState({inRoom: nextProps.users.selected.name})
    }else{
      this.setState({inRoom:false})
    }
  }

  componentDidMount(){
    if(this.props.room){
     this.setState({inRoom:this.props.room}) 
    }
  }

  render(){
    var room = this.state.inRoom?this.state.inRoom:null

    return(
    
    <div>
      
      <h1>{room}</h1>
      <div className="col-sm-9 col-xs-12">
          <div>
            <div className="col-sm-6">
              <RoomEditorContainer room={this.props.room} fireRefRoom={db.ref('rooms')} />
            </div>
            <div className="col-sm-6">
              <PeerContentsContainer fireRefRoom={db.ref('rooms')} />
            </div>
          </div>
      </div>
      <div className="col-sm-3">
        <div className="col-sm-12">
          <UsersPane room={this.props.room} fireRefNotes={db.ref('users(notes)')} fireRefRoom={db.ref('rooms')}/>
        </div>
        <div className="col-sm-12">
          <SentimentometerContainer />
        </div>
        <SidebarContainer/>
      </div>
    </div>
      )
  }
}

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