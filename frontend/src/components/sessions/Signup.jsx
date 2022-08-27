import {useEffect, useRef, useState} from "react";
import { useNavigate  } from "react-router-dom";
// import {useDispatch} from "react-redux";
import {
    IconButton,
    InputAdornment,
    OutlinedInput,
    Container,
    Card,
    CardContent,
    Typography,
    Alert,
    FormControl, FormGroup, InputLabel, Input, Button, Divider, CardActions, Box, Link
} from "@mui/material"
import {VisibilityOff, Visibility} from "@mui/icons-material";

function Signup() {
    const emailRef = useRef<HTMLInputElement>null
    const passwordRef = useRef<HTMLInputElement>null
    const passwordConfirmationRef = useRef<HTMLInputElement>null
    let errorMessages = []
    const [errors, setErrors] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const loading = false
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    useEffect(() => {
        emailRef?.current?.focus()
        if (errorMessages.length > 0) {
            setErrors(errorMessages)
            errorMessages = []
            // dispatch(resetErrorState)
        }
    })

    async function handleSubmit(event) {
        event.preventDefault()
        setErrors([])
        if (
            emailRef?.current === undefined
            || emailRef.current.value === ""
            || passwordRef?.current === undefined
            || passwordRef.current.value === ""
            || passwordConfirmationRef?.current === undefined
            || passwordConfirmationRef.current.value === ""
        ) {
            return setErrors(["Please fill out all fields"])
        }
        if (passwordConfirmationRef.current.value !== passwordRef.current.value) {
            return setErrors(["Passwords don't match"])
        }
        // const payload = {
        //     email: emailRef.current.value,
        //     password: passwordRef.current.value
        // }
        // const response = await dispatch(loginuser(payload))
        const response = ["Oops something went wrong"]
        console.log(response)
        if (errorMessages.length === 0) {
            navigate("/")
        } else {
            return setErrors(errorMessages)
        }
    }


    const passwordInput = <OutlinedInput id="password"
                                         type={showPassword ? 'text' : 'password'}
                                         inputRef={passwordRef}
                                         endAdornment={<InputAdornment position="end">
                                             <IconButton aria-label="toggle password visibility"
                                                         onClick={() => setShowPassword(!showPassword)}
                                                         onMouseDown={() => setShowPassword(!showPassword)}
                                                         edge="end">
                                                 {showPassword ? <Visibility /> : <VisibilityOff />}
                                             </IconButton>
                                         </InputAdornment>}
    >

    </OutlinedInput>
    const passwordConfirmationInput = <OutlinedInput id="password-confirmation"
                                         type={showPassword ? 'text' : 'password'}
                                         inputRef={passwordConfirmationRef}
                                         endAdornment={<InputAdornment position="end">
                                             <IconButton aria-label="toggle password visibility"
                                                         onClick={() => setShowPassword(!showPassword)}
                                                         onMouseDown={() => setShowPassword(!showPassword)}
                                                         edge="end">
                                                 {showPassword ? <Visibility /> : <VisibilityOff />}
                                             </IconButton>
                                         </InputAdornment>}
    >

    </OutlinedInput>
    return(
        <section>
            <Container maxWidth="md">
                <Card sx={{boxShadow: 1, maxWidth: "md"}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <Typography variant="h2" color="text.primary" gutterBottom>
                                Sign up
                            </Typography>
                            {errors.length > 0 ?
                                <Alert severity="error" aria-live="assertive">
                                    {errors.map((error, index) => {
                                        return <p key={`alert-${index}`}>{error}</p>
                                    })}
                                </Alert> : <></>}
                            <form onSubmit={handleSubmit}>
                                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="email" id="email-label">
                                            Email
                                        </InputLabel>
                                        <Input id="email" type="email" inputRef={emailRef} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password" id="password-label">
                                            Password
                                        </InputLabel>
                                        {passwordInput}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password-confirmation" id="password-confirmation-label">
                                            Password Confirmation
                                        </InputLabel>
                                        {passwordConfirmationInput}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <Button
                                            disabled={loading}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            id="submit-button">Create account</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                    <Divider light="false" />
                    <CardActions sx={{marginTop: "1em", justifyContent: "center"}}>
                        <Box>
                            <Typography variant="body2" color="text.secondary" align="center">
                                <Link to="/login">Already have an account?</Link>
                            </Typography>
                        </Box>
                    </CardActions>
                </Card>
            </Container>
        </section>
    )
}

export default Signup