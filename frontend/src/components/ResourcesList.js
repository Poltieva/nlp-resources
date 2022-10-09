import React from 'react';
import Resource from './Resource';
import instance from './api/axios';

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
        instance.get(
            `/resources`)
            .then((response) => {
                this.setState({
                    items: response.data,
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
                <section>
                    <section className="text-gray-600 body-font">
                        {
                            items.map(resource => {
                                return (
                                    <div key={resource.id} className="container px-5 mx-auto">
                                        <Resource resource={resource}/>
                                    </div>
                                )
                            })
                        }
                    </section>
                </section>
            </main>
        )
    }
}

export default ResourcesList;
