import {Button, FormControl, FormGroup, FormHelperText, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

function NameFormGroup({name, callback}) {
    return(
        <FormGroup row={true} id="name-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
                <InputLabel htmlFor="name" id="name-label">Resource Name</InputLabel>
                <Input id="name" type="text" value={name}
                       onChange={(e) => callback(e.target.value)}
                />
                <FormHelperText>Book title, course name etc.</FormHelperText>
            </FormControl>
        </FormGroup>
    )
}

function DescriptionFormGroup({description, callback}) {
    return(
        <FormGroup row={true} id="description-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
                <InputLabel htmlFor="description" id="description-label">Description</InputLabel>
                <Input id="description" type="text" value={description}
                       onChange={(e) => callback(e.target.value)}
                />
                <FormHelperText>Please, provide a helpful description as it is used by our recommendation algorithm</FormHelperText>
            </FormControl>
        </FormGroup>
    )
}

function UrlFormGroup({url, callback}) {
    return(
        <FormGroup row={true} id="url-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
                <InputLabel htmlFor="url" id="url-label">URL</InputLabel>
                <Input id="url" type="text" value={url}
                       onChange={(e) => callback(e.target.value)}
                />
                <FormHelperText>For copyright reasons we cannot provide resources themselves but you can put a url to them</FormHelperText>
            </FormControl>
        </FormGroup>
    )
}

function AuthorFormGroup({author, callback}) {
    return(
        <FormGroup row={true} id="author-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
                <InputLabel htmlFor="author" id="author-label">Author</InputLabel>
                <Input id="author" type="text" value={author}
                       onChange={(e) => callback(e.target.value)}
                />
            </FormControl>
        </FormGroup>
    )
}

function ImageUrlFormGroup({imageUrl, callback}) {
    return(
        <FormGroup row={true} id="imageUrl-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
                <InputLabel htmlFor="imageUrl" id="imageUrl-label">Image url</InputLabel>
                <Input id="imageUrl" type="text" value={imageUrl}
                       onChange={(e) => callback(e.target.value)}
                />
                <FormHelperText>You can add a url for an image if it is publicly available</FormHelperText>
            </FormControl>
        </FormGroup>
    )
}

function MediumFormGroup({medium, callback}) {
    const mediumMapping = {book: 0, video: 1, course: 2, article: 3, podcast: 4, other: 5}
    const mediumValue = mediumMapping[medium] === undefined ? '' : mediumMapping[medium]
    return(
        <FormGroup row={true} id="medium-group" sx={{marginTop: "1em"}}>
            <FormControl fullWidth>
                <InputLabel htmlFor="medium" id="medium-label">Medium</InputLabel>
                <Select id="medium" value={mediumValue}
                        onChange={(e) => callback(e.target.value)}
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
    )
}

function Keywords({keywords, callback}) {
    return(
        <div>
            {
                keywords.map((keyword, index) => {
                    return (
                        <div key={index} id={`keyword-${index}`}>
                            <div key={index} className="inline-block mr-2 mb-1 rounded-full bg-red-300 py-1 px-3">
                                <p>{keyword}</p>
                            </div>
                            <Button onClick={() => {
                                keywords = keywords.filter(function(item) {
                                    return item !== keyword
                                })
                                callback(keywords)
                            }}>
                                Delete
                            </Button>
                        </div>
                    )
                })
            }
        </div>
    )
}

function KeywordInput({keywords, callback}) {
    const [keyword, setKeyword] = useState('')
    function handleAddKeyword(keyword, keywords, callback) {
        callback([...keywords, keyword])
    }

    return(
        <div>
            <InputLabel htmlFor="keyword">New keyword</InputLabel>
            <Input id="keyword" type="text" value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}
            />
            <Button onClick={() => handleAddKeyword(keyword, keywords, callback)}>Add keyword</Button>
        </div>
    )
}
function AddKeywords({keywords, callback, type}) {

    function handleAdd() {
        return <KeywordInput keywords={keywords} callback={callback} />
    }

    return(
        <div>
            {type === "update" &&
                    <div>
                        <Button onClick={() => handleAdd()}>+</Button>
                    </div>
            }
        </div>
    )
}

function KeywordsFormGroup({keywords, callback, type}) {
    return(
        <FormGroup row={true} id="keywords-group" sx={{marginTop: "1em"}}>
            <div>
                <Keywords keywords={keywords} callback={callback} />
                <AddKeywords type={type} />
            </div>
        </FormGroup>
    )
}

function ButtonFormGroup({loading, type}) {
    return(
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
    )
}
export {ButtonFormGroup, AuthorFormGroup, DescriptionFormGroup,
    KeywordsFormGroup, ImageUrlFormGroup, NameFormGroup, UrlFormGroup, MediumFormGroup}