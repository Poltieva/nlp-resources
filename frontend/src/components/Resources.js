import ResourcesList from "./ResourcesList";
import {useSelector} from "react-redux";

function Resources() {
    const accessToken = useSelector((state ) => state.session.accessToken);
    return (
        <div className="container px-10 mx-auto">
            {accessToken ?
                <div className="my-5">
                    <a href="/create-new-resource" className="px-6 py-3 text-black no-underline bg-amber-200 rounded hover:bg-amber-500 hover:underline hover:text-white">Add resource</a>
                </div>
                : <></>}
            <h1 className="text-black text-3xl title-font font-bold mb-2">NLP resources:</h1>
            <ResourcesList />
        </div>
    )
}
export default Resources;