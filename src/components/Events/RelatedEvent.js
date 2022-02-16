import { useState, useEffect } from 'react';
import styled from 'styled-components';

const RelatedEvent = (props) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        setEvent(props.events.find((val) => val.id == props.event_id));
    }, [props.event_id]);

    const handleClick = () => {
        props.callback(event);
    }
    
    return(
        <Wrapper onClick={handleClick}>
            {event ? 
                <Title>{event.name}</Title>
            : null}
        </Wrapper>
    );
}

const Wrapper = styled.div`
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
    border-radius: 25px;
    margin: 25px;
    cursor: pointer;
    padding: 10px;


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
    }
`

const Title = styled.h1`
    font-size: var(--fs-body);
    font-weight: var(--fw-title);
    color: var(--white);

    text-align: center;
`

export default RelatedEvent;