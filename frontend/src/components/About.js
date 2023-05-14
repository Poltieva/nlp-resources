import {Container, Link, Typography} from "@mui/material";

function About () {
    return (
        <Container>
            <Typography variant="h4" component={"h1"}>FAQs</Typography>
            <section>
                <Typography variant="h5" component={"h2"}>What is this app? Who is it for?</Typography>
                <p>This is an app for sharing natural language processing resources with a built-in recommendation system.
                Anyone who is interested in natural language processing can find something here.</p>
                <Typography variant="h5" component={"h2"}>Can I add more resources?</Typography>
                <p>Any registered user can add resources.</p>
                <Typography variant="h5" component={"h2"}>Can I contribute to the app development?</Typography>
                <p>Yes, the repo is https://github.com/Poltieva/nlp-resources</p>
                <Typography variant="h5" component={"h2"}>I can't delete a resource!</Typography>
                <p>This app is still in development, so resource deletion is disabled.</p>
                <Typography variant="h5" component={"h2"}>I can't create/update a resource!</Typography>
                <p>There's a know issue with token expiration. Try loging out and back in.</p>
                <Typography variant="h5" component={"h2"}>I found a bug!</Typography>
                <p>Please, report it here: https://github.com/Poltieva/nlp-resources/issues
                if it is not there already.</p>
            </section>
        </Container>
    )
}
export default About;