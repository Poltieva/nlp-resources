import ResourcesList from "./ResourcesList";
import {connect} from "react-redux";
import {Component} from "react";
import {Link} from "react-router-dom";

class Resources extends Component {
    render() {
        return (
            <div className="container px-10 mx-auto">
                <p>Please, note that you have to enable insecure content in your browser!</p>
                {this.props.user && <div className="my-5">
                    <Link to="/create-new-resource" className="px-6 py-3 text-black no-underline bg-amber-200 rounded hover:bg-amber-500 hover:underline hover:text-white">Add resource</Link>
                </div>}
                <h1 className="text-black text-3xl title-font font-bold mb-2">NLP resources:</h1>
                <ResourcesList />
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Resources);