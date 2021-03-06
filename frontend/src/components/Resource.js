import {Fragment} from "react";

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

function Resource({resource}) {
    const elements = {
        name: <div key="name">
            <a href={`${process.env.REACT_APP_API_URL}/resources/${resource.id}`}
               className="text-black text-2xl title-font font-bold mb-2 underline">
                {resource.name}
            </a></div>,
        author: <Fragment key="author"><div className="inline-block mr-2">
            <div className="flex  pr-2 h-full items-center">
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
        url: <p key="url">Url: {resource.url}</p>
    }

    return (
        <div className="p-5 bg-white flex items-center mx-auto border-b
        mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
            <Image resource={resource} />
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                {Object.keys(elements).map((elem_key) =>
                    resource[elem_key] === null ? null : elements[elem_key]
                )}
            </div>
        </div>
    )
}
export default Resource;