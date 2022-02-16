import styled from 'styled-components';
import TextInput from '../UI/TextInput';
import { useState } from 'react';
import Button from '../UI/Button';

const LogIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        props.callback(email, password);
    }

    return(
        <Wrapper>
            <Title>Welcome to your Hack the North events page!</Title>
            {props.error ? 
                <Error>Whoa! Make sure you enter a password and email. Anything will do for either ;)</Error>
                : <Subtitle>Log in with an email below to get started.</Subtitle>
            }
            <Subtitle>PS - use an "@hackthenorth.com" email to see private events, and just type anything for your password!</Subtitle>
            <TextInput 
                placeholder="Email..."
                callback={(e) => setEmail(e.target.value)}
            />
            <TextInput 
                placeholder="Password..."
                callback={(e) => setPassword(e.target.value)}
                type="password"
            />
            <Button callback={onSubmit} mode={props.mode}>Log in</Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 40vw;
    padding: 25px;
    margin: 25px;    

    border-radius: 25px;

    transition: all 1s ease;

    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
    );

    outline: none;
    box-shadow: 0px 0px 20px var(--white);
`

const Title = styled.h1`
    font-size: var(--fs-title);
    font-weight: var(--fw-title);

    text-align: center;
`

const Subtitle = styled.h2`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-subtitle);
    font-style: italic;

    text-align: center;
`

const Error = styled.h2`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-subtitle);
    font-style: italic;

    text-align: center;
    color: #ae2012;
`

export default LogIn;