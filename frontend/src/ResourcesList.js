import React from 'react';
import Resource from './Resource';
import './css/Resource.css'

class ResourcesList extends React.Component {
    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        fetch(
            process.env.REACT_APP_API_URL)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }

    render() {
        const {DataisLoaded, items} = this.state;
        if (!DataisLoaded) return <div>
            <p> Please wait some time.... </p></div>;

        return (
            <main>
                {
                    items.map(resource => {
                        return (
                            <div key={resource.id} className="Resource">
                                <Resource resource={resource}/>
                            </div>
                        )
                    })
                }
            </main>
        )
    }
}

export default ResourcesList;
