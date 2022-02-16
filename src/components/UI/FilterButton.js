import styled from "styled-components";
import { useState, useEffect } from 'react';

const FilterButton = (props) => {
    // state ***************************************
    const [active, setActive] = useState(false);
    // *********************************************

    // useEffects **********************************
    useEffect(() => {
        if (active) {
            props.callback('add', props.eventType);
        } else {
            props.callback('remove', props.eventType);
        }
    }, [active]);
    // *********************************************

    // helper functions ****************************
    const handleClick = async () => {
        await setActive(!active);
    }
    // *********************************************

    return(
        <Button onClick={handleClick} active={active}>{props.name}</Button>
    );
}

const Button = styled.button`
    padding: 15px;
    margin: 15px;
    color: black;
    font-weight: bold;
    transition: all 1s ease;

    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
    );

    box-shadow: ${props => props.active ? 
        `0px 0px 20px var(--white);` :
        'none'
    }
    outline: none;

    border: transparent;
    border-radius: 15px;

    &:hover {
        background: linear-gradient(
            to right bottom,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.7)
        );

        cursor: pointer;
    }
`

export default FilterButton;