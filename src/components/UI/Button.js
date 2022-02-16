import styled from 'styled-components';

const Button = (props) => {
    return(
        <GlassButton mode={props.mode} onClick={props.callback}>{props.children}</GlassButton>
    )
}

const GlassButton = styled.button`
    padding: 15px;
    margin: 15px;
    margin-right: 0;
    color: var(--white);
    font-weight: bold;
    transition: all 1s ease;

    background: ${props => props.mode ? 
        `linear-gradient(
            to right bottom,
            rgba(79, 147, 126, 0.7),
            rgba(79, 147, 126, 0.3)
        );`:
        `linear-gradient(
            to right bottom,
            rgba(10, 68, 109, 0.7),
            rgba(10, 68, 109, 0.3)
        );`}
    
    border: transparent;
    border-radius: 15px;

    &:hover {
        background: ${props => props.mode ? 
            `linear-gradient(
                to right bottom,
                rgba(79, 147, 126, 1),
                rgba(79, 147, 126, 0.7)
            );`:
            `linear-gradient(
                to right bottom,
                rgba(10, 68, 109, 1),
                rgba(10, 68, 109, 0.7)
            );`}

        cursor: pointer;
    }
`

export default Button;