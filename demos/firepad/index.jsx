// import React from 'react'
// import firebase from 'APP/fire'
// const db = firebase.database()

// import Firepad from './Firepad'

// // This component is a little piece of glue between React router
// // and our Firepad component. It takes in props.params.title, and
// // shows the Firepad along with that title.
// export default ({params: {title}}) =>
//   <div>
//     <h1>{title}</h1>
//     {/* Here, we're passing in a Firebase reference to
//         /firepads/$firepadTitle. This is where the firepad is
//         stored in Firebase. Each firepad is just a string that the
//         component will listen to, but it could be the root of a more complex
//         data structure if we wanted. */}
//     <Firepad fireRef={db.ref('firepads').child(title)}/>
//   </div>
