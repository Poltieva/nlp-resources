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
            `${process.env.REACT_APP_API_URL}/resources`)
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
