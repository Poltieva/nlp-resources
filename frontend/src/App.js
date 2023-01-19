import AppRoutes from './components/AppRoutes';
import {Component} from "react";
import {HashRouter as Router} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <AppRoutes />
            </Router>
        )
    }
}
export default App;
