import React from 'react';
import Resource from './Resource';

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
            "https://jsonplaceholder.typicode.com/users")
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
            <h1> Pleses wait some time.... </h1></div>;

        return (
            items.map(resource => {
                return <Resource key={resource.id} resource={resource}/>
            })
        )
    }
}

export default ResourcesList;
