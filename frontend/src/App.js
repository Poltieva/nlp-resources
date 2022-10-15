import AppRoutes from './components/AppRoutes';
import { history } from './helpers/history';
import {Component} from "react";
import {clearMessage} from "./actions/message";
import {logout} from "./actions/auth";
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };

        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }
    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    logOut() {
        this.props.dispatch(logout());
    }
    render() {
        const {currentUser} = this.state;
        return (
            <BrowserRouter history={history}>
                <AppRoutes currentUser={currentUser} />
            </BrowserRouter>
        )
    }
  // return (
  //   <div className="App">
  //       <AppRoutes />
  //   </div>
  // );
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
