// // import AppRoutes from './components/AppRoutes';
// // import { history } from './helpers/history';
// import {Component} from "react";
// // import {clearMessage} from "./actions/message";
// // import {BrowserRouter} from "react-router-dom";
// import {HashRouter as Router, Route, Routes} from "react-router-dom";
//
// class App extends Component {
//     // constructor(props) {
//     //     super(props);
//     //
//     //     history.listen((location) => {
//     //         props.dispatch(clearMessage()); // clear message when changing location
//     //     });
//     // }
//
//     render() {
//         return (
//             // <BrowserRouter history={history}>
//             <Router>
//                 <Routes>
//                     <Route>
//                         <Route path="/" element={<Resources />} />
//                         <Route path="/about" element={<About />} />
//                     </Route>
//                 </Routes>
//                 {/*<AppRoutes />*/}
//             </Router>
//
//             // </BrowserRouter>
//         )
//     }
// }
//
// function About() {
//     return(
//         <p>About</p>
//     )
// }
// function Resources() {
//     return(
//         <p>Resources</p>
//     )
// }
// export default App;



function App() {
    return (
        <div className="App">
            <Resources />

        </div>
    );
}

function Resources() {
    // console.error(process.env.REACT_APP_TEST)
    return(
        <p>dddddddddd</p>
        // <p>{process.env.REACT_APP_API_URL}</p>
    )
}


export default App;
