import React from 'react';
import Resource from './Resource';
import instance from './api/axios';
import ReactPaginate from 'react-paginate';

class ResourcesList extends React.Component {
    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            dataisLoaded: false,
            pageCount: 0,
            currentPage: 0
          };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        this.fetchResources(0);
    }

    fetchResources(page) {
        instance.get(`/resources?page=${page + 1}`)
          .then((response) => {
            this.setState({
              items: response.data.resources,
              dataisLoaded: true,
              pageCount: response.data.total_pages,
              currentPage: page
            });
            console.log(this.state)
        });
    }

    handlePageChange(selectedPage) {
        const { selected } = selectedPage;
        this.fetchResources(selected);
    }

    render() {
        const { dataisLoaded, items, pageCount, currentPage } = this.state;
        if (!dataisLoaded) return <div><p>Please wait some time....</p></div>;

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
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageChange}
                    subContainerClassName={'pages pagination'}
                    forcePage={currentPage}
                    containerClassName="pagination flex justify-center mt-8 mb-8"
                    pageClassName="inline-block mx-1"
                    pageLinkClassName="px-4 py-2 rounded-lg bg-blue-500 text-white"
                    activeClassName="active"
                    previousClassName="mr-4"
                    nextClassName="ml-4"
                    previousLinkClassName="px-4 py-2 rounded-lg bg-blue-500 text-white"
                    nextLinkClassName="px-4 py-2 rounded-lg bg-blue-500 text-white"
                />
            </main>
        )
    }
}

export default ResourcesList;
