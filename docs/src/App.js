import AppRoutes from './components/AppRoutes';
// import { history } from './helpers/history';
import {Component} from "react";
// import {clearMessage} from "./actions/message";
// import {BrowserRouter} from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

class App extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     history.listen((location) => {
    //         props.dispatch(clearMessage()); // clear message when changing location
    //     });
    // }

    render() {
        return (
            // <BrowserRouter history={history}>
            <Router>
                <AppRoutes />
            </Router>

            // </BrowserRouter>
        )
    }
}
export default App;