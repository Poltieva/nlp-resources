import {useEffect, useState} from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function ResourceForm() {
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [medium, setMedium] = useState('');
    const resourceId = window.location.pathname.split('/')[2]
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/resources/${resourceId}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    setName(response.data.description)
                    setDescr(response.data.url)
                    setUrl(response.data.url)
                    setAuthor(response.data.author)
                    setImageUrl(response.data.image_url)
                    setKeywords(response.data.keywords)
                    setMedium(response.data.medium)
                }
            })
            .catch((e) => console.log('something went wrong!', e));
    }, [])
    return (
        <div className="container px-10 mx-auto">
            <p>{imageUrl}</p>
        </div>
    )
}
export default ResourceForm;