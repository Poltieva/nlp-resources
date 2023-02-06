import {useEffect, useState} from "react";
import store from "../store";
import {
    Button, Card, CardContent, Container, FormControl,
    FormGroup, FormHelperText, Input, InputLabel, MenuItem, Select,
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../services/user.service";

function ResourceForm({type}) {
    const isLoggedIn = store.getState().auth.isLoggedIn;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [medium, setMedium] = useState('');
    const resourceId = useParams().id
    const arrOfVars = ['name', 'description', 'url', 'author', 'imageUrl', 'medium', 'keywords']
    const redirect = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) { navigate('/login') }

        if (type === "create") {
            setLoading(false)
        } else {
            UserService.getResource(resourceId)
                .then((response) => {
                    if (response.status === 200) {
                        arrOfVars.forEach((value) => {
                            eval(`set${value[0].toUpperCase() + value.substr(1)}(response.data.${value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)})`)
                        })
                        setLoading(false)
                    } else if (response.status === 401) {
                        redirect('/login')
                    }
                    else {
                        if (response.data.errors) {
                            alert(response.data.errors)
                        } else { alert(response) }
                    }
                })
                .catch((e) => {
                    if (e.response.data) {
                        alert(e.response.data)
                    } else { alert(e) }
                });
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        let payload = {resource: {}};

        if (type === "create") {
            arrOfVars.forEach((i) => {
                if (eval(i).length > 0) {
                    payload.resource[i.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)] = eval(i)
                }
            })
            UserService
                .postNewResource(payload)
                .then((response) => {
                    if (response.status === 201) {
                        navigate('/')
                    }
                })
                .catch((error) => {
                    if (error.response.data.errors) {
                        alert(error.response.data.errors)
                    } else { alert(error) }
                });
        } else {
            arrOfVars.forEach((i) => {
                payload.resource[i.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)] = eval(i)
            })
            UserService
                .updateResource(resourceId, payload)
                .then((response) => {
                    if (response.status === 200) {
                        navigate('/')
                    }
                })
                .catch((error) => {
                    if (error.response.data.errors) {
                        alert(error.response.data.errors)
                    } else { alert(error) }
                });
        }
    }

    function Form() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup row={true} id="name-group" sx={{marginTop: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="name" id="name-label">Resource Name</InputLabel>
                        <Input id="name" type="text" value={name}
                               onChange={(e) => setName(e.target.value)}
                        />
                        <FormHelperText>Book title, course name etc.</FormHelperText>
                    </FormControl>
                </FormGroup>
                <FormGroup row={true} id="description-group" sx={{marginTop: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="description" id="description-label">Description</InputLabel>
                        <Input id="description" type="text" value={description}
                               onChange={(e) => setDescription(e.target.value)}
                        />
                        <FormHelperText>Please, provide a helpful description as it is used by our recommendation algorithm</FormHelperText>
                    </FormControl>
                </FormGroup>
                <FormGroup row={true} id="url-group" sx={{marginTop: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="url" id="url-label">URL</InputLabel>
                        <Input id="url" type="text" value={url}
                               onChange={(e) => setUrl(e.target.value)}
                        />
                        <FormHelperText>For copyright reasons we cannot provide resources themselves but you can put a url to them</FormHelperText>
                    </FormControl>
                </FormGroup>
                <FormGroup row={true} id="author-group" sx={{marginTop: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="author" id="author-label">Author</InputLabel>
                        <Input id="author" type="text" value={author}
                               onChange={(e) => setAuthor(e.target.value)}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row={true} id="imageUrl-group" sx={{marginTop: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="imageUrl" id="imageUrl-label">Image url</InputLabel>
                        <Input id="imageUrl" type="text" value={imageUrl}
                               onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <FormHelperText>You can add a url for an image if it is publicly available</FormHelperText>
                    </FormControl>
                </FormGroup>
                <FormGroup row={true} id="medium-group" sx={{marginTop: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="medium" id="medium-label">Medium</InputLabel>
                        <Select id="medium" value={medium}
                               onChange={(e) => setMedium(e.target.value)}
                        >
                            <MenuItem value={0}>book</MenuItem>
                            <MenuItem value={1}>video</MenuItem>
                            <MenuItem value={2}>course</MenuItem>
                            <MenuItem value={3}>article</MenuItem>
                            <MenuItem value={4}>podcast</MenuItem>
                            <MenuItem value={5}>other</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                {keywords.length > 0 && <FormGroup row={true} id="keywords-group" sx={{marginTop: "1em"}}>
                    {
                        keywords.map((keyword, index) => {
                            return (
                                <div key={index}>
                                    <div key={index} className="inline-block mr-2 mb-1 rounded-full bg-red-300 py-1 px-3">
                                        <p>{keyword}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <p>Uneditable for now :(</p>
                </FormGroup>
                }
                <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
                    <FormControl fullWidth>
                        <Button
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            type="submit"
                            id="submit-button">{type === "create" ? "Create" : "Update"} this resource</Button>
                    </FormControl>
                </FormGroup>
            </form>
        )
    }

    return (
        <section className="container px-10 mx-auto">
            <Container>
                <Card sx={{boxShadow:1, maxWidth: 'md'}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <Form />
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </section>
    )
}
export default ResourceForm;