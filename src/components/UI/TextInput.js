import styled from "styled-components";

const SearchInput = (props) => {
    return(
        <Input onChange={props.callback} placeholder={props.placeholder} type={props.type}></Input>
    );
}

const Input = styled.input`
    background: var(--white);
    padding: 15px;
    margin: 25px;

    border-radius: 25px;
    border: none;

    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
    );
    width: 70%;

    font-family: 'Poppins';
    
    
    &::placeholder {
        color: black;
        font-style: italic;
    }

    transition: all 1s ease;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 20px var(--white);
    }
`

export default SearchInput;