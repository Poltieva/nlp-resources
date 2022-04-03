

function Resource({resource}) {
    return (
        <>
            <a href={`${process.env.REACT_APP_API_URL}/resources/${resource.id}`}>{resource.name}</a>
            <p>Author: TODO</p>
            <p>Type: {resource.medium}</p>
            <p>Description:</p>
            <p>{resource.description}</p>
            <p>Url: {resource.url}</p>
        </>
    )
}
export default Resource;