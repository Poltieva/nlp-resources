import {Component, Fragment} from "react";
import handleDelete from "../helpers/axios";
import {connect} from "react-redux";

function Image({resource}) {
    return (
        <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
            <img
                src={resource.image_url}
                alt="Resource"
            />
        </div>
    );
}

class Resource extends Component {
    render() {
        const resource = this.props.resource
        const elements = {
            name: <div key="name"><h2 className="text-black text-2xl title-font font-bold mb-2">{resource.name}</h2></div>,
            author: <Fragment key="author"><div className="inline-block mr-2">
                <div className="flex pr-2 h-full items-center">
                    <p>Author: {resource.author}</p>
                </div>
            </div></Fragment>,
            medium: <Fragment key="medium"><div className="inline-block mr-2">
                <div className="flex pr-2 h-full items-center">
                    <p>Type: {resource.medium}</p>
                </div>
            </div></Fragment>,
            keywords: <div key="keywords">
                {resource.keywords.map(
                    (keyword, index) =>
                        <div key={index} className="inline-block mr-2 mb-1 rounded-full bg-red-300 py-1 px-3">
                            <p>{keyword}</p>
                        </div>
                )}
            </div>,
            description: <Fragment key="description"><p>Description:</p>
                <p className="px-5">{resource.description}</p></Fragment>,
            url: <p key="url">Url: {resource.url}</p>,
            user_name: <Fragment key="user_name"><p>Added by: {resource.username}</p></Fragment>
        }

        return (
            <div id={`${resource.id}`} className="p-5 bg-white mx-auto border-b
            mb-10 border-gray-200 rounded-lg">
                <div className="flex items-center sm:flex-row flex-col mb-5">
                    <Image resource={resource} />
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        {Object.keys(elements).map((elem_key) =>
                            resource[elem_key] === null ? null : elements[elem_key]
                        )}
                    </div>
                </div>

                {this.props.user && <div>
                    <a className="px-6 py-3 text-black no-underline bg-blue-200 rounded"
                       href={`#/update-resource/${resource.id}`}>Edit</a>
                    <button
                        onClick={(e) => handleDelete(`${process.env.REACT_APP_API_URL}/resources/${resource.id}`)}
                        rel="nofollow" className="px-6 mx-5 py-3 text-white no-underline bg-red-500 rounded"
                    >Delete
                    </button>
                </div>}
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

export default connect(mapStateToProps)(Resource);