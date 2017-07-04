import React from 'react'
import firebase from 'APP/fire'
import SidebarContainer from '../../app/containers/SidebarContainer'
import SentimentometerContainer from '../../app/containers/SentimentometerContainer'
import RoomEditorContainer from '../../app/containers/RoomEditorContainer'
import PeerContentsContainer from '../../app/containers/PeerContentsContainer'
import DraftjsScratchpad from '../../demos/draftjsscratchpad/DraftjsScratchpad'
import RoomSidebar from '../../app/components/RoomSidebar'
import UserSidebar from '../../app/components/UserSidebar'
import store from '../../app/store'
import { connect } from 'react-redux'
const db = firebase.database()
    , auth = firebase.auth()

class PersonalEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state={self:{uid:null, name:"name not set"}}

  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=> {
            if(user){

                var name = user.email?user.email:"anon"
                this.setState({self: {uid:user.uid, name:name}})
            }else{
              console.log("there is no user")
            }
        })
  }

  render(){


    return(
    <div>
      <h1>Hello, {this.state.self.name}</h1>
      {/* Here, we're passing in a Firebase reference to
          /scratchpads/$scratchpadTitle. This is where the scratchpad is
          stored in Firebase. Each scratchpad is just a string that the
          component will listen to, but it could be the root of a more complex
          data structure if we wanted. */}
      <div className="col-sm-9 col-xs-9">
       
          <div>
            <div className="col-sm-12">
              <DraftjsScratchpad fireRefNotes={db.ref('users(notes)')}/>
            </div>
          </div>

      </div>
      <div className="col-sm-3 col-xs-3">
        <SentimentometerContainer />
        <SidebarContainer/>
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

export default connect(mapState, mapDispatch)(PersonalEditor)