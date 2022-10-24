import {useEffect, useState} from "react";
import store from "../store";
import { Alert, Button, Card, CardContent, Container, FormControl,
    FormGroup, Input, InputLabel, } from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../services/user.service";

function ResourceForm() {
    const isLoggedIn = store.getState().auth.isLoggedIn;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [medium, setMedium] = useState('');
    const resourceId = useParams().id
    const path = window.location.pathname
    const arrOfVars = ['name', 'description', 'url', 'author', 'imageUrl', 'medium', 'keywords']

    useEffect(() => {
        if (!isLoggedIn) { navigate('/login') }

        if (path === "/create-new-resource") {
            setLoading(false)
        } else {
            UserService.getResource(resourceId)
                .then((response) => {
                    if (response.status === 200) {
                        arrOfVars.forEach((value) => {
                            eval(`set${value[0].toUpperCase() + value.substr(1)}(response.data.${value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)})`)
                        })
                        setLoading(false)
                    } else {
                        setErrors([])
                        setErrors(response.data.errors)
                    }
                })
                .catch((e) => {
                    setErrors([])
                    setErrors(e.response.data)
                });
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([])

        let payload = {resource: {}};

        if (path === "/create-new-resource") {
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
                    setErrors(error.response.data.errors)
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
                    setErrors(error.response.data.errors)
                });
        }
    }

    return (
        <section className="container px-10 mx-auto">
            <Container maxWidth="md">
                <Card sx={{boxShadow:1, maxWidth: 'md'}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            {errors.length > 0 ?
                                <Alert severity="error" aria-live="assertive">
                                    {errors.map((error, index) => {
                                        return <p key={`alert-${index}`}>
                                            {error}
                                        </p>
                                    })}
                                </Alert>
                                : <></>}
                            <form onSubmit={handleSubmit}>
                                <FormGroup row={true} id="name-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="name" id="name-label">Resource Name</InputLabel>
                                        <Input id="name" type="text" value={name}
                                               onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="description-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="description" id="description-label">Description</InputLabel>
                                        <Input id="description" type="text" value={description}
                                               onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="url-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="url" id="url-label">URL</InputLabel>
                                        <Input id="url" type="text" value={url}
                                               onChange={(e) => setUrl(e.target.value)}
                                        />
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
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="medium-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="medium" id="medium-label">Medium</InputLabel>
                                        <Input id="medium" type="text" value={medium}
                                               onChange={(e) => setMedium(e.target.value)}
                                        />
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
                                            id="submit-button">{path === "/create-new-resource" ? "Create" : "Update"} this resource</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </section>
    )
}
export default ResourceForm;