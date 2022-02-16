import styled from "styled-components";
import Button from './Button';
import ToggleButton from "./ToggleButton";

const NavBar = (props) => {
    return(
        <Nav>
            <NavWrapper mode={props.mode}>
                <NavTitle mode={props.mode}>Your Hack the North Events List</NavTitle>
                <ButtonsWrapper>
                    <ToggleButton callback={props.toggleMode} mode={props.mode}/>
                </ButtonsWrapper>
            </NavWrapper>
        </Nav>
    )
}

const Nav = styled.nav`
    width: 100vw;
    height: 10vh;
    margin-top: 25px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const NavWrapper = styled.div`
    width: 70vw;
    border-radius: 25px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const NavTitle = styled.h1`
    font-size: var(--fs-title);
    font-weight: var(--fw-title);
    color: var(--white);
    transition: all 1s ease;

    // background: linear-gradient(
    //     to right bottom,
    //     rgba(255, 255, 255, 0.7),
    //     rgba(255, 255, 255, 0.3)
    // );

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
    padding: 15px;
    border-radius: 15px;
`

export default NavBar;


// background: ${props => props.mode ? 
//     `linear-gradient(
//         to right bottom,
//         rgba(79, 147, 126, 0.7),
//         rgba(79, 147, 126, 0.3)
//     );`:
//     `linear-gradient(
//         to right bottom,
//         rgba(10, 68, 109, 0.7),
//         rgba(10, 68, 109, 0.3)
//     );`}