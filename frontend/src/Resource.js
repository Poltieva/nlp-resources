import './css/Resource.css';
function Resource({resource}) {
    return (

        <div className="p-5 bg-white flex items-center mx-auto border-b
        mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
                <img
                    src={"https://via.placeholder.com/150?text=:("}
                    alt="Resource"
                />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <a href={`${process.env.REACT_APP_API_URL}/resources/${resource.id}`}
                   className="text-black text-2xl title-font font-bold mb-2">
                    {resource.name}
                </a>
                <p>Author: TODO</p>
                <p>Type: {resource.medium}</p>
                <p>Description:</p>
                <p className="px-5">{resource.description}</p>
                <p>Url: {resource.url}</p>
            </div>
        </div>
    )
}
export default Resource;