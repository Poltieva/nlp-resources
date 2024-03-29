import {useEffect, useState} from "react";
import store from "../store";
import {
    ButtonFormGroup, AuthorFormGroup, DescriptionFormGroup,
    KeywordsFormGroup, 
    ImageUrlFormGroup, NameFormGroup,
    UrlFormGroup, MediumFormGroup
} from "./FormGroups"
import { Card, CardContent, Container } from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../services/user.service";
import {toSnakeCase, toCamelCase} from "../helpers/helpers";

function ResourceForm({type}) {
    const isLoggedIn = store.getState().auth.isLoggedIn;
    const userId = store.getState().auth.user.id;
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
                            eval(`set${toCamelCase(value)}(response.data.${toSnakeCase(value)})`)
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
        arrOfVars.forEach((i) => {
            if (eval(i).toString().length > 0) {
                payload.resource[toSnakeCase(i)] = eval(i)
            }
        })
        payload.user_id = userId
        if (type === "create") {
            
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

    return (
        <section className="container px-10 mx-auto">
            <Container>
                <Card sx={{boxShadow:1, maxWidth: 'md'}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <form onSubmit={handleSubmit}>
                                <NameFormGroup name={name} callback={setName} />
                                <DescriptionFormGroup description={description} callback={setDescription} />
                                <UrlFormGroup url={url} callback={setUrl} />
                                <AuthorFormGroup author={author} callback={setAuthor} />
                                <ImageUrlFormGroup imageUrl={imageUrl} callback={setImageUrl} />
                                <MediumFormGroup medium={medium} callback={setMedium} />
                                <KeywordsFormGroup keywords={keywords} callback={setKeywords} type={type} />
                                <ButtonFormGroup loading={loading} type={type} />
                            </form>
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </section>
    )
}
export default ResourceForm;
